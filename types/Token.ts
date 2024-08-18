import { Types } from "mongoose";

export interface Token {
  userId: Types.ObjectId;
  accessToken: string;
  refreshToken: string;
}
