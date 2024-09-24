import { ObjectId } from "mongodb";

export interface IPost {
  _id?: ObjectId;
  userId: ObjectId;
  description: string;
  picturePath: string;
  likes: string[];
  comments: string[];
  createdAt?: Date;
}
