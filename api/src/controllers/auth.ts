import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JWT_SECRET_KEY } from "../config";
import { Request, Response } from "express";

/* REGISTER */
export const register = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
    location,
    occupation,
    profilePicPath,
  } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) return res.json("Email already exists");

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      friends: [],
      location,
      occupation,
      profilePicPath,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/* LOGIN */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json("Wrong Credentials");

    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) return res.status(401).json("Wrong Credentials");

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);
    delete user.password;

    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json(err);
  }
};
