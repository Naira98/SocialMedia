import express from "express";
import { getFeed, likePost, deletePost } from "../controllers/posts";
import { verifyToken } from "../middlewares/is-auth";
const router = express.Router();

router.get("/:userId",verifyToken , getFeed);

router.patch("/:postId",verifyToken , likePost);

router.delete('/:postId', verifyToken, deletePost);

export default router;
