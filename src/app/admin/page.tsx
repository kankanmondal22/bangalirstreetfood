"use client";
import { useSession } from "@/utils/auth-client";
import { redirect } from "next/navigation";
import { use } from "react";

export default function AdminPage() {
  const session = useSession();

  if (!session?.data?.user) {
    redirect("/admin/login");
  }
  redirect("/admin/users");
}
