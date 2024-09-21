import mongoose, { Document, ObjectId, Schema } from "mongoose";
import User from "./User";

export interface IPost {
  userId: ObjectId;
  description: string;
  picturePath: string;
  likes: Map<string, boolean>;
  comments: string[];
}

export interface IPostModel extends IPost, Document<ObjectId> {}

const postSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    description: {
      type: String,
      required: true,
    },
    picturePath: { type: String, default: "" },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: { type: [{ type: String }], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IPostModel>("Post", postSchema);
