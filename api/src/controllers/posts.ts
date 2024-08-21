import fs from "fs";
import { NextFunction, Response } from "express";

import { RequestWithUser } from "../types/RequestWithUser";
import Post from "../models/Post";
import { Post as PostType } from "../../../types/Post";

export const getFeed = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    let posts: PostType[];
    if (userId.toString() === req.user.userId.toString()) {
      posts = await Post.find()
        .populate("userId", "firstName lastName picturePath")
        .sort({ createdAt: -1 });
    } else {
      posts = await Post.find({ userId: userId })
        .populate("userId", "firstName lastName picturePath")
        .sort({ createdAt: -1 });
    }

    // return all posts
    return res.status(200).json(posts);
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

    const posts = await Post.find()
      .populate("userId", "firstName lastName picturePath")
      .sort({ createdAt: -1 });

    // return all posts
    res.status(201).json(posts);
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

    const post = await Post.findById(postId).populate(
      "userId",
      "firstName lastName picturePath"
    );
    if (!post) return res.status(404).json({message: "Post not found"});

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await post.save();

    // return updated post only
    res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json(err);
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

    const post = await Post.updateOne({_id: postId}, {$push:{comments: comment}}).populate(
      "userId",
      "firstName lastName picturePath"
    );
    if (!post) return res.status(404).json({message: "Post not found"});

    // return updated post only
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
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

    const post = await Post.findOne({ _id: postId, userId: userId });

    if (post.picturePath) {
      const postWithSameImage = await Post.find({
        picturePath: post.picturePath,
      });
      console.log(postWithSameImage);
      if (postWithSameImage.length === 1) deleteImage(post.picturePath);
    }

    await Post.findOneAndDelete({ _id: postId, userId: userId });

    // return id of deleted post only
    res.status(200).json({ postId });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteImage = (path: string) => {
  console.log(path);
  fs.unlink(path, (err) => {
    if (err) console.log(err);
  });
};
