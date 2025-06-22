const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userRegister = async (req, res) => {
  const {
    name,
    email,
    password,
    bio,
    skillsOffered,
    skillsWanted,
    profilePic,
    location,
    ratings,
  } = req.body;

  if (!name || !email || !password || !location) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const regUser = await UserModel.findOne({ email });
  if (regUser) {
    return res
      .status(400)
      .json({ message: "User already exists with this email" });
  }

  const newUser = await UserModel.create({
    name,
    email,
    password,
    bio,
    skillsOffered,
    skillsWanted,
    profilePic,
    location,
    ratings,
  });
  if (!newUser) {
    return res.status(500).json({ message: "Error creating user" });
  }
  return res
    .status(201)
    .json({ message: "User created successfully", newUser });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPassMatch = await bcrypt.compare(password, user.password);
  if (!isPassMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted,
      profilePic: user.profilePic,
      location: user.location,
      ratings: user.ratings,
    },
    token,
  });
};
