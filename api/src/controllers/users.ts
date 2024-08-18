import { NextFunction, Response } from "express";
import { RequestWithUser } from "../types/RequestWithUser";
import User from "../models/User";

export const getUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "-password -createdAt -updatedAt");
    if (!user) return res.status(404).json("User not found");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getUserFriends = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json("User not found");
    const friends = await Promise.all(
      user.friends.map((id) =>
        User.findById(id).select(
          "_id firstName lastName occupation picturePath viewedProfile impressions "
        )
      )
    );

    return res.status(200).json(friends);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addRemoveFriend = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user;
    const { friendId } = req.params;

    if (userId.toString() === friendId.toString())
      return res.status(400).json("You can't follow yourself");

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) =>
        User.findById(id).select(
          "_id firstName lastName occupation picturePath viewedProfile impressions "
        )
      )
    );
    return res.status(200).json(friends);
  } catch (err) {
    return res.status(500).json(err);
  }
};
