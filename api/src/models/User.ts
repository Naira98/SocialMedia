import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { User } from "../../../types/User";

export interface IUser {
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

export interface IUserModel extends IUser, Document<ObjectId> {}

const userSchema: Schema = new mongoose.Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picturePath: { type: String, default: "" },
    friends: { type: [{ type: String }], default: [] },
    location: String,
    occupation: String,
    viewedProfile: { type: Number },
    impressions: { type: Number },
    twitter: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>("User", userSchema);
