import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI inside your .env.local file"
  );
}

const options = {};

declare global {
  // eslint-disable-next-line no-var
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global.mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI, options);
    global.mongoClientPromise = client.connect();
  }

  clientPromise = global.mongoClientPromise;
} else {
  const client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

export { clientPromise };

// Export db for Better Auth
export const db = (await clientPromise).db();