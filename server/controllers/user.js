import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import { Chat } from "../models/chat.js";

const signup = async (req, res) => {
  try {
    let avatar = {};

    if (req.file) {
      const result = await uploadToCloudinary([req.file], "Tangy-avatar");
      avatar = {
        public_id: result[0].public_id,
        url: result[0].url,
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
      return next(new ErrorHandler("Invalid Email", 404));
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Password", 404));
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

  const mychats = await Chat.find({ groupChat: false, members: req.user })
  const myFriends = mychats.map((i) => i.members).flat()
  const usersNotFriends = await User.find({
    _id: { $nin: myFriends },
    username: { $regex: name || "", $options: "i" }
  })

  const users = usersNotFriends.map(({_id,avatar,username})=>{
    return{
      _id,username,avatar:avatar.url
    }
  })

  res.status(200).json({
    success: true,
    users
  });
};

export { login, signup, getMyProfile, logout, searchUser };
