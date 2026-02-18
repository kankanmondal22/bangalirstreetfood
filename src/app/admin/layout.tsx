"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { authClient } from "@/utils/auth-client";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuth();

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      return;
    }

    // Check authentication
    checkAuth();
  }, [pathname, checkAuth]);

  // Redirect to login if not authenticated (after loading is complete)
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          logout();
          router.push("/admin/login");
        },
        onError: (ctx) => {
          console.error("Logout failed:", ctx.error.message);
        },
      },
    });
  };

  // Don't show layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-teal-600">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [{ href: "/admin/users", label: "Users", icon: "👥" }];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-teal-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? "bg-teal-800 text-white"
                    : "text-teal-100 hover:bg-teal-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-teal-800">
          <div className="text-sm text-teal-200 mb-2">{user?.email}</div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-teal-100 hover:bg-teal-800 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
