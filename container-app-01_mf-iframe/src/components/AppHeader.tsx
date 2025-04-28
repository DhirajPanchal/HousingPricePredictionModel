"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userName, modules, clearUserContext } = useAppContext();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    clearUserContext();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="bg-gray-100 h-20 flex items-center justify-center px-6 ">
      {/* Logo */}
      <Link href="/" className="absolute left-6 flex items-center space-x-2">
        <Image
          src="/hsbc3.png"
          alt="Logo"
          width={84} //
          height={84}
          className="object-contain"
        />
      </Link>

      {/* Title Centered Absolutely */}
      <h1 className="text-2xl font-bold text-gray-700 text-center">
        Global Services Platform
      </h1>

      {/* Only show Avatar + Menu if user is logged in */}
      {userName && (
        <div className="absolute right-6">
          <button
            onClick={toggleMenu}
            className="w-12 h-12 bg-gray-200 flex items-center justify-center 
              border border-gray-300 rounded-full shadow hover:ring-2 hover:ring-gray-400 transition overflow-hidden"
          >
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 
              bg-white shadow-md border border-gray-200 rounded-md z-50"
            >
              {/* Static First Link */}
              <Link
                href="/user-context"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Your Applications
              </Link>

              {/* Dynamic Module Links */}
              {modules.map((module) => (
                <Link
                  key={module.moduleId}
                  href={`/${module.route}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {module.moduleName}
                </Link>
              ))}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
