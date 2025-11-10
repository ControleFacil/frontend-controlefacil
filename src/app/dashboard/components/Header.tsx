"use client";

import { Bell, Plus, X } from "lucide-react";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-black">Dashboard</h1>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </header>
    </>
  );
}
