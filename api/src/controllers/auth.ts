import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUserModel } from "../models/User";
import { REFRESH_SECRET } from "../config/config";
import { generateAccessToken, generateRefreshToken } from "../../lib/helpers";
import { Token as TokenType } from "../types/Token";
import Token from "../models/Token";

/* REGISTER */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    firstName,
    lastName,
    password,
    location,
    occupation,
    picturePath,
  } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) return res.status(409).json({ message: "Email already exists" });

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
      picturePath,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
      twitter: "",
      linkedin: "",
    });
    await newUser.save();

    return res.status(201).json({ message: "You registered successfully" });
  } catch (err) {
    next(err);
  }
};

/* LOGIN */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).lean();
    if (!user) return res.status(401).json({ message: "Wrong Credentials" });

    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) return res.status(401).json({ message: "Wrong Credentials" });

    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    const tokens = new Token({
      userId: user._id,
      refreshToken,
    });

    await tokens.save();

    delete user.password;
    delete user.friends;

    return res
      .status(200)
      .json({ tokens: { accessToken, refreshToken }, user });
  } catch (err) {
    next(err);
  }
};

/* REFRESH */
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    const tokenInDB = await Token.findOne({ refreshToken });
    if (!tokenInDB) return res.status(401).json({ message: "Invalid Token" });

    jwt.verify(
      refreshToken,
      REFRESH_SECRET,
      async (err: Error, userData: TokenType) => {
        if (err)
          return res.status(401).json({ message: "You are not authenticated" });

        const accessToken = generateAccessToken({ userId: userData.userId });
        return res.status(200).json({
          accessToken,
        });
      }
    );
  } catch (err) {
    return res.status(401).json(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Token.findOneAndDelete({ userId: req.userId });
    return res.status(200).json({ message: "Logged out" });
  } catch (err) {
    return res.status(401).json(err);
  }
};
