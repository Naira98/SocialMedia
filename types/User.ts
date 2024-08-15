import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicPath: string;
  token?: string | undefined;
  friends: string[];
  location?: string;
  occupation?: string;
  viewedProfile: number;
  impressions: number;
}
