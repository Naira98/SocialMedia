import { PostCreator } from "./User";

export interface IPost {
  _id: string;
  userId: PostCreator;
  description: string;
  picturePath: string;
  likes: string[];
  comments: string[];
  createdAt: Date;
}

