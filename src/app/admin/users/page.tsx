"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser } from "@/app/admin/_actions/user-actions";

interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await getUsers();
      if (result.success && result.data) {
        setUsers(result.data);
      } else {
        console.error("Failed to fetch users:", result.message);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await createUser(formData);
      if (!result.success) {
        setError(result.message || "Failed to create user");
        return;
      }
      setSuccess(result.message || "Admin user created successfully");
      setFormData({ email: "", password: "", name: "" });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Users</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          {showForm ? "Cancel" : "+ New Admin"}
        </button>
      </div>

      {/* Create User Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Admin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-700 mb-1"
              >
                Name (optional)
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Create Admin
            </button>
          </form>
        </div>
      )}

      {success && (
        <div className="text-sm text-teal-700 bg-teal-50 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">All Admins</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No users found. Create your first admin user.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div
                key={user.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {user.name || user.email}
                  </div>
                  {user.name && (
                    <div className="text-sm text-gray-500">{user.email}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
