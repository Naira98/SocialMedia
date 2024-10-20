import { IPost } from "../types/IPost";
import { IToken } from "../types/IToken";
import { IUser } from "../types/IUser";
import db from "./db";

export const users = db.collection<IUser>("users");
export const posts = db.collection<IPost>("posts");
export const tokens = db.collection<IToken>("tokens");

// import { Collection, Db } from "mongodb";
// import { IPost } from "../../types/IPost";
// import { IToken } from "../../types/IToken";
// import { IUser } from "../../types/IUser";
// import { MONGO_DB } from "../config/config";
// import { run } from "./db";

// export let users: Collection<IUser>;
// export let posts: Collection<IPost>;
// export let tokens: Collection<IToken>;

// run(MONGO_DB).then((result) => {
//     const db = result;
//     users = db.collection<IUser>("users");
//     posts = db.collection<IPost>("posts");
//     tokens = db.collection<IToken>("tokens");
// }).catch(console.dir);
