import jwt from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "../src/config/config.js";

const generateAccessToken = ({ userId }) => {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "10m" });
};
const generateRefreshToken = ({ userId }) => {
  return jwt.sign({ userId }, REFRESH_SECRET);
};

export { generateAccessToken, generateRefreshToken };
