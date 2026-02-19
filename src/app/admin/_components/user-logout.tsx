"use client";
import { redirect } from "next/navigation";
import { signOut, useSession } from "@/utils/auth-client";

const UserLogout = () => {
  // const { user, isAuthenticated, logout } = useAuth();
  const { data } = useSession();
  const user = data?.user;

  const handleLogout = async () => {
    await signOut();
    redirect("/admin/login");
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-teal-800">
      <div className="text-sm text-teal-200 mb-2">
        {user?.email || "Guest User"}
      </div>
      <button
        onClick={handleLogout}
        className="w-full text-left px-3 py-2 text-sm text-teal-100 hover:bg-teal-800 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default UserLogout;
