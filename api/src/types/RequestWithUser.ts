import { Request } from "express";
import { Types } from "mongoose";

export interface RequestWithUser extends Request {
  user: { userId: string };
}

// type RequestWithUser = Request & {
//     user: {};
//   };
