import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { REFRESH_SECRET } from "../config/config";
import { generateAccessToken, generateRefreshToken } from "../utils/generateJWT";
import { tokens, users } from "../db/collections";
import { ObjectId } from "mongodb";
import { IToken } from "../types/IToken";
import { RequestWithUser } from "../types/RequestWithUser";

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
    const user = await users.findOne({ email: email });
    if (user) return res.status(409).json({ message: "Email already exists", picturePath });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await users.insertOne({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      friends: [],
      location,
      occupation,
      picturePath,
      twitter: "",
      linkedin: "",
    });

    return res.status(201).json({
      message: "You registered successfully",
      userId: newUser.insertedId,
    });
  } catch (err) {
    console.error(err);
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
    const user = await users.findOne({ email: email });
    if (!user) return res.status(401).json({ message: "Wrong Credentials" });

    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) return res.status(401).json({ message: "Wrong Credentials" });

    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    await tokens.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          userId: user._id,
          refreshToken,
        },
      },
      { upsert: true }
    );

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
    const tokenInDB = await tokens.findOne({ refreshToken });
    if (!tokenInDB) return res.status(401).json({ message: "Invalid Token" });

    jwt.verify(
      refreshToken,
      REFRESH_SECRET,
      async (err: Error, userData: IToken) => {
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
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    await tokens.findOneAndDelete({ userId: new ObjectId(req.user.userId) });
    return res.status(200).json({ message: "Logged out" });
  } catch (err) {
    return res.status(401).json(err);
  }
};
