import { Request } from "express";

export interface RequestWithUser extends Request {
  user: Payload
}

export interface Payload {
  userId: string
}

