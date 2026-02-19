import { getUsers } from "@/app/admin/_actions/user-actions";
import { User } from "@/types/user";
import Link from "next/link";
// import { User } from "better-auth";

export default async function UsersPage() {
  let users: User[] = [];

  try {
    const res = await getUsers();
    if (res.success && res.data) users = res.data;
  } catch (err) {
    console.error(err);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="page-heading mb-0">Users</h2>
        <Link className="add-button" href="/admin/users/add">
          Add User
        </Link>
      </div>
      {/* table */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt.toISOString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
