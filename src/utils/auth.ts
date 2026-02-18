import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { randomUUID } from "crypto";

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
    requireEmailVerification: false,
  },
  sessions: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  cookies: {
    sessionToken: {
      name: "auth_session",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    },
  },
  advanced: {
    database: {
      generateId: () => randomUUID(),
    },
  },
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
  plugins: [nextCookies()],
});
