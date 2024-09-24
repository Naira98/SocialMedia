import { IPost } from "../../types/IPost";
import { IToken } from "../../types/IToken";
import { IUser } from "../../types/IUser";
import { db } from "./db";

export const users = db.collection<IUser>("users");
export const posts = db.collection<IPost>("posts");
export const tokens = db.collection<IToken>("tokens");
