import { ObjectId } from "mongodb";

export interface IToken {
  _id?: ObjectId;
  userId: ObjectId;
  refreshToken: string;
}
