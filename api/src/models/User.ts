import mongoose from "mongoose";
import { User } from "../../../types/User";

const userSchema = new mongoose.Schema<User>(
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

const User = mongoose.model<User>("User", userSchema);
export default User;
