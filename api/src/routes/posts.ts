import express from "express";
import {
  getFeed,
  getProfileFeed,
  likePost,
  commentPost,
  deletePost,
  addPost,
} from "../controllers/posts";
import { verifyToken } from "../middlewares/is-auth";
import { addCommentValidation, addPostValidation } from "../validation/posts-validation";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/", verifyToken, getFeed);

router.get("/:userId", verifyToken, getProfileFeed);

router.patch("/:postId", verifyToken, likePost);

router.post(
  "/",
  verifyToken,
  upload.single("picture"),
  addPostValidation,
  addPost
);

router.post("/:postId", addCommentValidation, verifyToken, commentPost);

router.delete("/:postId", verifyToken, deletePost);

export default router;
