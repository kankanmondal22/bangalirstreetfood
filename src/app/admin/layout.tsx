import Sidebar from "./_components/sidebar";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="ml-64 bg-gray-100 min-h-screen p-8">{children}</main>
    </div>
  );
}
