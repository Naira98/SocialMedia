import { Types } from "mongoose";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicPath: string;
  friends: string[];
  location?: string;
  occupation?: string;
  viewedProfile: number;
  impressions: number;
}
