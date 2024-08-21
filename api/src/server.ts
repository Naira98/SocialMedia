import path from "path";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";
import { nanoid } from 'nanoid'

import { MONGO_URI } from "./config";
import { register } from "./controllers/auth";
import { addPost } from "./controllers/posts";
import { verifyToken } from "./middlewares/is-auth";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import { users, posts } from "../data/index.js";
import User from "./models/User";
import Post from "./models/Post";
import { registerValidation } from "./validation/auth-validate";
import { addPostValidation } from "./validation/posts-validation";

const PORT = 3000;
const app = express();
export const imagesPath = path.join(__dirname, "..", "public", "assets")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "public", "assets"))
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    const randomeName = nanoid() + path.extname(file.originalname)
    cb(null, randomeName);
    req.body.picturePath = randomeName
  },
});

const fileFilter = (req, file, cb) => {
  console.log(req.body)
  var ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return cb(new Error("Only images are allowed"));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

app.post(
  "/auth/register",
  upload.single("picture"),
  registerValidation,
  register
);
app.post(
  "/posts",
  verifyToken,
  upload.single("picture"),
  addPostValidation,
  addPost
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

mongoose.connect(MONGO_URI);
app.listen(PORT, () => {

  /* ADD DATA ONE TIME */
  // User.insertMany(users);
  // Post.insertMany(posts);

  return console.log(`Express is listening at http://localhost:${PORT}`);
});
