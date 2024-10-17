import fs from "fs";
import path from "path";
import { NextFunction, Response } from "express";
import { RequestWithUser } from "../types/RequestWithUser";
import { IMAGES_PATH } from "../server";
import { posts, users } from "../db/collections";
import { ObjectId } from "mongodb";

export const getFeed = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const feed = await posts.find().sort({ createdAt: -1 }).toArray();

    const feedPostsPopulated = await Promise.all(
      feed.map(async (post) => {
        const postAuthor = await users.findOne(
          { _id: post.userId },
          {
            projection: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              picturePath: 1,
            },
          }
        );

        return { ...post, userId: postAuthor };
      })
    );
    // return all posts
    return res.status(200).json(feedPostsPopulated);
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

    const profilePosts = await posts
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();

    const profilePostsPopulated = await Promise.all(
      profilePosts.map(async (post) => {
        const postAuthor = await users.findOne(
          { _id: post.userId },
          {
            projection: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              picturePath: 1,
            },
          }
        );
        return { ...post, userId: postAuthor };
      })
    );
    return res.status(200).json(profilePostsPopulated);
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
   await posts.insertOne({
      userId: new ObjectId(userId),
      description,
      picturePath,
      likes: [],
      comments: [],
      createdAt: new Date(),
    });

    // return all posts
    res.status(201).json({ message: "Post created successfully" });
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

    const post = await posts.findOne({ _id: new ObjectId(postId) });

    if (!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      await posts.updateOne(
        { _id: new ObjectId(postId) },
        { $pull: { likes: { $in: [userId] } } }
      );
    } else {
      await posts.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { likes: userId } }
      );
    }

    res.status(200).json({ message: "Success" });
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

    await posts.findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $push: { comments: comment } }
    );

    // return updated post only
    res.status(200).json({ message: "Comment added successfully" });
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

    const post = await posts.findOne({
      _id: new ObjectId(postId),
      userId: new ObjectId(userId),
    });

    if (post.userId.toString() !== userId)
      return res
        .status(403)
        .json({ message: "You can delete your posts only" });

    await posts.findOneAndDelete({
      _id: new ObjectId(postId),
      userId: new ObjectId(userId),
    });
    if (post.picturePath) deleteImage(post.picturePath);

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
