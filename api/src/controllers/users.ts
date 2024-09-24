import { NextFunction, Response } from "express";
import { RequestWithUser } from "../types/RequestWithUser";
import { users } from "../db/collections";
import { ObjectId } from "mongodb";

export const getMe = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user;
    const user = await users.findOne(
      { _id: ObjectId.createFromHexString(userId) },
      {
        projection: {
          email: 0,
          password: 0,
          friends: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getProfileUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // get profile user (useProfileUser)
    const { id } = req.params;
    const user = await users.findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          email: 0,
          password: 0,
          friends: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUserFriends = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    const friends = [];
    await Promise.all(
      user.friends.map(async (id) => {
        const friend = await users.findOne(
          { _id: new ObjectId(id) },
          {
            projection: {
              firstName: 1,
              lastName: 1,
              occupation: 1,
              picturePath: 1,
            },
          }
        );
        friends.push(friend);
      })
    );
    return res.status(200).json(friends);
  } catch (err) {
    next(err);
  }
};

export const addRemoveFriend = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user;
    const friendId = req.params.friendId;

    if (userId.toString() === friendId.toString())
      return res.status(400).json({ message: "You can't follow yourself" });

    const user = await users.findOne({ _id: new ObjectId(userId) });
    const friend = await users.findOne({ _id: new ObjectId(friendId) });

    if (user.friends.includes(friendId)) {
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { friends: { $in: [friendId] } } }
      );
      await users.updateOne(
        { _id: new ObjectId(friendId) },
        { $pull: { friends: { $in: [userId] } } }
      );
    } else {
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { friends: friendId } }
      );
      await users.updateOne(
        { _id: new ObjectId(friendId) },
        { $push: { friends: userId } }
      );
    }

    return res.status(200).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};

export const updateAccount = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    let { userId, firstName, lastName } = req.body;

    if (req.user.toString() === userId.toString()) {
      return res
        .status(403)
        .json({ message: "Can't add link to another user" });
    }

    await users.updateOne(
      { _id: ObjectId.createFromHexString(userId) },
      { $set: { firstName, lastName } }
    );

    // return updatedUser
    res.status(200).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};

export const addTwitter = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    let { userId, link } = req.body;

    if (req.user.toString() === userId.toString()) {
      return res
        .status(403)
        .json({ message: "Can't add link to another user" });
    }

    await users.updateOne(
      { _id: ObjectId.createFromHexString(userId) },
      { $set: { twitter: link } }
    );

    // return updatedUser
    res.status(200).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};

export const addLinkedin = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    let { userId, link } = req.body;

    if (req.user.toString() === userId.toString()) {
      return res
        .status(403)
        .json({ message: "Can't add link to another user" });
    }

    await users.updateOne(
      { _id: ObjectId.createFromHexString(userId) },
      { $set: { linkedin: link } }
    );

    // return updatedUser
    res.status(200).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};
