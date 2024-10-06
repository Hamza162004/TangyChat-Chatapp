import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOption, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const signup = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Plz Send an avatar" });
      return;
    }
    console.log(req.file)
    console.log("Body------->" , req.body)
    const result = await uploadToCloudinary(req.file.buffer, "Tangy-avatar");

    const { username, bio, email, password } = req.body;

    const avatar = {
      public_id: result.public_id,
      url: result.url,
    };

    const user = await User.create({
      username,
      bio,
      email,
      password,
      avatar
    });

    sendToken(res, user, 201, `User ${username} created `);
  } catch (error) {
    res.json({ error });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email", 404));
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Password", 404));
    }
    sendToken(res, user, 200, "Welcome back!");
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("Tangy-token", "", { ...cookieOption, maxAge: 0 })
    .json({
      success: true,
      message: "logged out",
    });
};

const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    res.json({ sucess: true, user });
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  const { name } = req.query;

  res.status(200).json({
    success: true,
    message: name,
  });
};

export { login, signup, getMyProfile, logout, searchUser };
