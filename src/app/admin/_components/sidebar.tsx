"use client";
import Link from "next/link";
import UserLogout from "./user-logout";
import { usePathname } from "next/navigation";
import { BiConversation, BiMapPin, BiUser, BiWallet } from "react-icons/bi";
import { FaMountain } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
  return (
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

      <UserLogout />
    </aside>
  );
};

const menuItems = [
  {
    href: "/admin/users",
    label: "Users",
    icon: <BiUser size={20} />,
  },
  { href: "/admin/packages", label: "Tours", icon: <BiMapPin size={20} /> },
  {
    href: "/admin/bookings",
    label: "Bookings",
    icon: <FaMountain size={20} />,
  },
  {
    href: "/admin/payments",
    label: "Payments",
    icon: <BiWallet size={20} />,
  },
  {
    href: "/admin/enquires",
    label: "Enquiries",
    icon: <BiConversation size={20} />,
  },
];

export default Sidebar;
