"use server";

import { auth, db } from "@/utils/auth";
import dbConnect from "@/utils/db";
import { User } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
// import { redirect } from "next/";
interface ActionResult<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
}

export async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function getUsers() {
  try {
    await requireSession();
    await dbConnect();

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
        name: user.name as string | "Unknown User",
        createdAt: user.createdAt as Date,
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

    revalidatePath("/admin/users");
    // push to /admin/users
    return {
      success: true,
      message: "Admin user created successfully",
      data: result.user,
    };

    // redirect("/admin/users", RedirectType.replace);
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}
