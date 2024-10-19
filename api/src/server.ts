import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import "./db/db";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import { notFound } from "./controllers/notFound";
import { errorHandler } from "./controllers/errorHandler";
// import {  usersData, postsData } from "../data/index.js";
// import { posts, users } from "./db/collections";

const PORT = 3000;
export const app = express();

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

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

export const server = app.listen(PORT, () => {
  /* ADD DATA ONE TIME */
  // posts.insertMany(postsData);
  // users.insertMany(usersData);

  return console.log(`Server starts on port: ${PORT}`);
});
