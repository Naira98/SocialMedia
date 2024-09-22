import { Request } from "express";
import mongoose from "mongoose";

export interface RequestWithUser extends Request {
  user: Payload;
}

export interface Payload {
  userId: string;
}
