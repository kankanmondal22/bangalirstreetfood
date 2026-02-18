"use server";

import { auth, db } from "@/utils/auth";
import { headers } from "next/headers";

interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

interface ActionResult<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
}

async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function getUsers(): Promise<ActionResult<User[]>> {
  try {
    await requireSession();

    const usersCollection = db.collection("user");
    const users = await usersCollection
      .find({})
      .project({ password: 0 })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: users.map((user) => ({
        id: (user._id as { toString: () => string }).toString(),
        email: user.email as string,
        name: user.name as string | undefined,
        createdAt: user.createdAt as string,
      })),
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch users",
    };
  }
}

export async function createUser(formData: {
  email: string;
  password: string;
  name: string;
}): Promise<ActionResult<User>> {
  try {
    await requireSession();

    const { email, password, name } = formData;

    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    if (password.length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters",
      };
    }

    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!result) {
      return { success: false, message: "Failed to create user" };
    }

    return {
      success: true,
      message: "Admin user created successfully",
      data: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        createdAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}
