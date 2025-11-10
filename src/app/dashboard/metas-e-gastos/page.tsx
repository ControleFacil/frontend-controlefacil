"use client";

import Sidebar from "@/app/dashboard/components/Sidebar";
import Goals from "../components/Goals/Goals";
import FutureExpenses from "../components/Future-Expenses/FutureExpenses";
import { motion } from "framer-motion";

export default function MetasEGastosPage() {
  return (
    <div className="flex h-screen bg-gray-100 p-6 gap-6">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto space-y-10">
        {/* ===== HEADER ===== */}
        <header className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-gray-800">
              Metas e Gastos Futuros
            </h1>
            <p className="text-gray-500 leading-relaxed">
              Acompanhe suas metas financeiras e mantenha o controle sobre seus
              próximos compromissos. Essa área é dedicada ao seu planejamento e
              crescimento financeiro.
            </p>
            <div className="flex flex-wrap gap-3 text-sm mt-2 text-gray-600">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Atualize suas metas regularmente
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Analise gastos previstos
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Mantenha uma visão clara do seu futuro financeiro
              </span>
            </div>
          </div>
        </header>
          <Goals />
          <FutureExpenses />

      </main>
    </div>
  );
}
