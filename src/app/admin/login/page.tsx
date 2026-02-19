import AuthForm from "@/app/admin/_forms/AuthForm";
import { isAuthenticated } from "../_actions/auth-actions";
import { redirect, RedirectType } from "next/navigation";

export default async function AdminLogin() {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) {
    // redirect to /admin/`dashboard`

    redirect("/admin/users", RedirectType.replace);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">
            Admin Panel
          </p>
          <h1 className="admin-page-title text-2xl">Sign in to your account</h1>
        </div>
        <div className="admin-card">
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
}
