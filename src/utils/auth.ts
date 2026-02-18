import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

// Singleton pattern to prevent multiple connections in Next.js dev mode
const globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
};

if (!globalWithMongo._mongoClient) {
  globalWithMongo._mongoClient = new MongoClient(MONGODB_URI);
}

const client = globalWithMongo._mongoClient;
export const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
});
