import path from "path";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";

import { MONGO_URI } from "./config";
import { register } from "./controllers/auth";
import { addPost } from "./controllers/posts";
import { verifyToken } from "./middlewares/is-auth";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";

const PORT = 3000;
const app = express();
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
    cb(null, path.join(__dirname, "..", "public", "assets"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts",verifyToken , upload.single("picture"), addPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

mongoose.connect(MONGO_URI);
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
