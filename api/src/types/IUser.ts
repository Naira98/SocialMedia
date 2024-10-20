import { ObjectId } from "mongodb";

export interface IUser {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: string[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  twitter: string;
  linkedin: string;
}
