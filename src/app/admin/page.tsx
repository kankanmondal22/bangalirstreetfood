import { useSession } from "@/utils/auth-client";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const session = useSession();

  if (!session?.data?.user) {
    redirect("/admin/login");
  }
  redirect("/admin/users");
}
