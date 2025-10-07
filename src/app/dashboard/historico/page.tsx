"use client";

import Sidebar from "@/app/dashboard/components/Sidebar";
import EmBreve from "@/app/dashboard/components/EmBreve";

export default function HistoricosPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 p-4 gap-4">
      <Sidebar />
      <main className="flex-1 bg-white rounded-2xl shadow-md p-6 overflow-y-auto">
        <EmBreve titulo="Histórico" />
      </main>
    </div>
  );
}
