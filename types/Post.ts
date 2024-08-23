import { Types } from "mongoose";
import { User } from "./User";

export interface Post {
  _id: Types.ObjectId;
  userId: User;
  description: string;
  picturePath: string;
  likes: Map<string, boolean>;
  // likes: {
  //   [key: string]: boolean;
  // }[];
  comments: string[];
  createdAt: Date;
}

// interface UserData {
//   userId: Types.ObjectId;
//   firstName: String;
//   lastName: String;
//   profilePicPath: String;
//   location?: String;
// }
