import "dotenv/config";

// Script to create the first admin user
// Run with: node --import tsx src/scripts/create-first-admin.ts
// Or add to package.json: "create-admin": "node --import tsx src/scripts/create-first-admin.ts"

import { auth } from "../utils/auth";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createFirstAdmin() {
  console.log("Create First Admin User\n");

  const email = await question("Email: ");
  const password = await question("Password (min 8 chars): ");
  const name = await question("Name (optional): ");

  if (!email || !password) {
    console.error("Email and password are required");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters");
    process.exit(1);
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: name || email.split("@")[0],
      },
    });

    console.log("\n✓ Admin user created successfully!");
    console.log("Email:", result?.user.email);
    console.log("\nYou can now login at: http://localhost:3000/admin/login");
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Failed to create admin user:", error);
    process.exit(1);
  }
}

createFirstAdmin().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
