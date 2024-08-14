import { NextFunction, Response } from "express";
import Post from "../models/Post";
import { RequestWithUser } from "../types/RequestWithUser";

export const getFeed = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find().populate(
      "userId",
      "firstName lastName profilePicPath"
    );
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getPost = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate(
      "userId",
      "firstName lastName profilePicPath"
    );
    if (!post) return res.status(404).json("Post not found");
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addPost = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { description, picturePath, location } = req.body;
    const { userId } = req.user;
    const newPost = new Post({
      userId,
      description,
      picturePath,
      location,
      likes: {},
    });
    const addedPost = await newPost.save();
    res.status(201).json(addedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const likePost = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json("Post not found");

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
};
