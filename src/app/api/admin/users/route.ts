import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

// GET - List all users (admins only)
export async function GET() {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get all users from the database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = (auth as any).options.database;
    const usersCollection = db.db.collection("user");

    const users = await usersCollection
      .find({})
      .project({ password: 0 }) // Exclude password field
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      users: users.map((user: any) => ({
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// POST - Create new admin user (admins only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // Create user using better-auth
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: name || undefined,
      },
    });

    if (!result) {
      return NextResponse.json(
        { message: "Failed to create user" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to create user",
      },
      { status: 500 },
    );
  }
}
