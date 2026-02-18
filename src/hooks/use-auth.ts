import { useAuthStore } from "@/store/auth-store";

/**
 * Hook to access authentication state and actions
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, logout } = useAuth();
 *
 * if (!isAuthenticated) {
 *   return <Redirect to="/login" />;
 * }
 *
 * return <div>Hello, {user?.email}</div>;
 * ```
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };
}
