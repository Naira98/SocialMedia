import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || '';
export const MONGO_URI = process.env.MONGO_URI || '';
export const ACCESS_SECRET = process.env.ACCESS_SECRET || '';
export const REFRESH_SECRET = process.env.REFRESH_SECRET || '';