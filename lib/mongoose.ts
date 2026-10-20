// lib/db.ts
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

// ==========================================
// 1. MongoClient Instance (For Better Auth)
// ==========================================
export const client = new MongoClient(MONGODB_URI);
export const db = client.db(); // Used by better-auth adapter

// ==========================================
// 2. Mongoose Connection (For Your Models)
// ==========================================
declare global {
  // Global cache to prevent multiple Mongoose connections in Next.js hot-reloading
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  // Check if Mongoose is already connected
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log("MongoDB (Mongoose) Connected Successfully");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", err);
    throw err;
  }

  return cached.conn;
}
