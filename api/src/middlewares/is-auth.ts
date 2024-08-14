import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access Decliend" });

    if (token.startsWith("Bearer ")) {
      token = token.split(" ").at(1);
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Token invalid" });
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
