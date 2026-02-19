"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/utils/auth";
import { authClient } from "@/utils/auth-client";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(128);
const nameSchema = z.string().min(1).max(100);

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
});

export async function signUp(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsedData = signUpSchema.parse(rawData);

  const { user } = await auth.api.signUpEmail({
    body: {
      email: parsedData.email,
      password: parsedData.password,
      name: parsedData.name,
    },
  });

  if (!user) return { ok: false, error: "Failed to create user" };
  return { ok: true };
}

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export async function signIn(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const data = signInSchema.parse(rawData);

  const res = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
    },
  });

  return { ok: true, userId: res.user?.id };
}

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user ?? null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  return { ok: true };
}

// check if user is authenticated in every request
export async function isAuthenticated(): Promise<boolean> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return false;

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
