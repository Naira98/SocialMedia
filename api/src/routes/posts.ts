import express from "express";
import {
  getFeed,
  getProfileFeed,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/posts";
import { verifyToken } from "../middlewares/is-auth";
import { addCommentValidation } from "../validation/posts-validation";
const router = express.Router();

router.get("/", verifyToken, getFeed);

router.get("/:userId", verifyToken, getProfileFeed);

router.patch("/:postId", verifyToken, likePost);

router.post("/:postId", addCommentValidation, verifyToken, commentPost);

router.delete("/:postId", verifyToken, deletePost);

export default router;
