import fs from "fs";
import path from "path";
import { NextFunction, Response } from "express";
import { RequestWithUser } from "../types/RequestWithUser";
import Post from "../models/Post";
import { IMAGES_PATH } from "../server";

export const getFeed = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find()
      .populate("userId", "firstName lastName picturePath friends")
      .sort({ createdAt: -1 });

    // return all posts
    return res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

export const getProfileFeed = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId: userId })
      .populate("userId", "firstName lastName picturePath friends")
      .sort({ createdAt: -1 });

    // return all posts
    return res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

export const addPost = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { description, picturePath } = req.body;
    const { userId } = req.user;
    const newPost = new Post({
      userId,
      description,
      picturePath,
    });
    await newPost.save();

    const posts = await Post.find()
      .populate("userId", "firstName lastName picturePath friends")
      .sort({ createdAt: -1 });

    // return all posts
    res.status(201).json(posts);
  } catch (err) {
    next(err);
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

    let post = await Post.findById(postId).populate(
      "userId",
      "firstName lastName picturePath friends"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter((i) => i !== userId);
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await post.save();
    // return updated post only
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

export const commentPost = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    const post = await Post.updateOne(
      { _id: postId },
      { $push: { comments: comment } }
    ).populate("userId", "firstName lastName picturePath friends");
    if (!post) return res.status(404).json({ message: "Post not found" });

    // return updated post only
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;

    const picturePath = (await Post.findOne({ _id: postId, userId: userId }))
      .picturePath;

    await Post.findOneAndDelete({ _id: postId, userId: userId });
    deleteImage(picturePath);

    // return id of deleted post only
    res.status(200).json({ postId });
  } catch (err) {
    next(err);
  }
};

const deleteImage = (imagePath: string) => {
  fs.unlink(path.join(IMAGES_PATH, imagePath), (err) => {
    if (err) console.log(err);
  });
};
