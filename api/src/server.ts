import path from "path";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import { MONGO_URI } from "./config/config";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import { notFound } from "./controllers/notFound";
import { errorHandler } from "./controllers/errorHandler";
import { users, posts } from "../data/index.js";
import User from "./models/User";
import Post from "./models/Post";

const PORT = 3000;
const app = express();
export const IMAGES_PATH = path.join(__dirname, "..", "public", "assets");

declare module "express" {
  interface Request {
    userId?: string;
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "public", "assets"))
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

mongoose.connect(MONGO_URI);
app.listen(PORT, () => {
  /* ADD DATA ONE TIME */
  // User.insertMany(users);
  // Post.insertMany(posts);

  return console.log(`Server starts on port: ${PORT}`);
});
