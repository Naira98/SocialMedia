import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGO_DB, MONGO_URI } from "../config/config";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(MONGO_DB).command({ ping: 1 });
  } catch (err) {
    console.log(err.message);
  }
}
run().catch(console.dir);

export const db = client.db(MONGO_DB);
