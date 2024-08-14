import { Types } from "mongoose";

export interface Post {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  description: string;
  location: string;
  picturePath: string;
  likes: Map<string, boolean>;
  // likes: {
  //   [key: string]: boolean;
  // }[];
  comments: string[];
}

// interface UserData {
//   userId: Types.ObjectId;
//   firstName: String;
//   lastName: String;
//   profilePicPath: String;
//   location?: String;
// }
