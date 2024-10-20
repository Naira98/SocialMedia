import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../config/config";
import { NextFunction, Response } from "express";
import { Payload, RequestWithUser } from "../types/RequestWithUser";

export const verifyToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access Declined" });

    if (token.startsWith("Bearer ")) {
      token = token.split(" ").at(1);
    }
    jwt.verify(token, ACCESS_SECRET, (err, user: Payload) => {
      if (err) return res.status(403).json({ message: "Token invalid" });
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
