import mongoose from "mongoose";
import User from "./User";
import { Token } from "../types/Token";

const tokenSchema = new mongoose.Schema<Token>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model<Token>("Token", tokenSchema);
export default Token;
