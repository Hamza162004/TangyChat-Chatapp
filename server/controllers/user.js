import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import validator from "validator";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    let avatar = {};

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "Tangy-avatar");
      avatar = {
        public_id: result.public_id,
        url: result.url,
      };
    }

    const { username, bio, email, password } = req.body;

    const userPresent = await User.findOne({ email: email });

    if (userPresent) {
      throw new Error("User already exists");
    }

    // validation
    if (!email || !password) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    }

    const user = await User.create({
      username,
      bio,
      email,
      password,
      avatar,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({
      message: "Wohoo User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw Error("User does not exist");
      return next(new ErrorHandler("Invalid Email", 404));
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw Error("Invalid Password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({
      message: "Welcome Back!",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
