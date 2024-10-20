import { MongoClient } from "mongodb";
import { NODE_ENV, MONGO_URI } from "../config/config";
import dotenv from "dotenv";

dotenv.config();
let MONGO_DB = process.env.MONGO_DB || "";

// Append -test to MONGO_DB if NODE_ENV is test
if (NODE_ENV === "test")
  MONGO_DB += `-${Math.random().toString().slice(2)}-test`;

// MongoDB client
const client = new MongoClient(MONGO_URI);

// MongoDB connection
export const connectionPromise = client
  .connect()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

// Set Database
const db = client.db(MONGO_DB);

// Export db and client
export default db;
export { client };
