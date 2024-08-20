import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { REFRESH_SECRET } from "../config";
import Token from "../models/Token";
import { generateAccessToken, generateRefreshToken } from "../../lib/helpers";
import { Token as TokenType } from "../types/Token";
import { RequestWithUser } from "../types/RequestWithUser";

/* REGISTER */
export const register = async (req: Request, res: Response) => {
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
    if (user) return res.status(409).json("Email already exists");

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
    // console.log(newUser)
    await newUser.save();

    delete newUser.password;

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

    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    const newToken = new Token({
      userId: user._id,
      accessToken,
      refreshToken,
    });

    const tokens = await newToken.save();

    delete user.password;

    return res.status(200).json({ tokens, user });
  } catch (err) {
    return res.status(500).json(err);
  }
};

/* REFRESH */
export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken, userId } = req.body;
    if (!refreshToken) throw new Error("No refresh token available");

    const tokenInDb = await Token.find({ refreshToken: refreshToken })
      .sort({ createdAt: -1 })
      .limit(1);
    if (tokenInDb.length === 0) throw new Error("You are not authorized");

    jwt.verify(
      refreshToken,
      REFRESH_SECRET,
      async (err: Error, userData: TokenType) => {
        if (err) throw new Error("You are not authenticated");

        const newAccessToken = generateAccessToken({ userId: userData.userId });
        const newRefreshToken = generateRefreshToken({
          userId: userData.userId,
        });

        await Token.deleteMany({ userId: userId });
        const newToken = new Token({
          userId: userData.userId,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
        const tokens = await newToken.save();
        return res.status(200).json(tokens);
      }
    );
  } catch (err) {
    return res.status(401).json(err.message);
  }
};

/* LOGOUT */
export const logout = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user;
  try {
    await Token.deleteMany({ userId: userId });
    return res.status(200).json("Logged out!");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
