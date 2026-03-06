"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Packages", href: "/package" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="print:static print:shadow-none">
      {/* Top Banner – Logo & Brand */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 py-4 px-4">
          <Image
            src="/bangalir_street_food_logo1.jpg"
            alt="Bangalir Street Food Logo"
            width={500}
            height={500}
            className="h-24 w-24 object-cover rounded-full"
          />
          <Image
            src="/khobarchoriadin.png"
            alt="Bangalir Street Food"
            width={800}
            height={500}
            className="h-20 w-auto object-contain"
          />
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Small logo in navbar */}
          <Link href="/" className="shrink-0">
            <Image
              src="/bangalir_street_food_logo1.jpg"
              alt="Logo"
              width={100}
              height={100}
              className="h-9 w-9 object-cover rounded-full border-2 border-teal-200"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button asChild size="sm" className="ml-3">
              <Link href="/package">Book a Trip</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-1">
            {navigationLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button asChild className="w-full mt-2" size="sm">
              <Link href="/package" onClick={() => setMobileOpen(false)}>
                Book a Trip
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
