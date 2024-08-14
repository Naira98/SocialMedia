import mongoose from "mongoose";
import User from "./User";
import { Post } from "../types/Post";

const postSchema = new mongoose.Schema<Post>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    description: {
      type: String,
      required: true,
    },
    location: { type: String, default: "" },
    picturePath: { type: String, default: "" },
    likes: {
      type: Map,
      of: Boolean,
    },

    comments: { type: [{ type: String }], default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model<Post>("Post", postSchema);
export default Post;
