"use client";

import Sidebar from "@/app/dashboard/components/Sidebar";
import Transactions from "@/app/dashboard/components/Transactions/Transactions";

export default function PagamentosPage() {
  return (
    <div className="flex h-screen bg-gray-50 gap-4 p-4">
      <Sidebar />

      <main className="flex-1 flex flex-col gap-6 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Histórico de Transações</h2>
          <Transactions />
        </div>
      </main>
    </div>
  );
}
