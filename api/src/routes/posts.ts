import express from "express";
import { getFeed, getPost, likePost } from "../controllers/posts";
import { verifyToken } from "../middlewares/is-auth";
const router = express.Router();

router.get("/",verifyToken ,getFeed);
router.get("/:postId",verifyToken , getPost);

router.patch("/:postId",verifyToken , likePost);

export default router;
