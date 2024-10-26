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
  twitter: string;
  linkedin: string;
}
