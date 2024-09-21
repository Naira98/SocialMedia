import mongoose, { Document, ObjectId, Schema } from "mongoose";
import User from "./User";

export interface IToken {
  userId: ObjectId;
  refreshToken: string;
}

export interface ITokenModel extends IToken, Document<ObjectId> {}

const tokenSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ITokenModel>("Token", tokenSchema);
