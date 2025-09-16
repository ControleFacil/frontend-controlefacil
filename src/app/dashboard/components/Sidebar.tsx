"use client";

import { useState } from "react";
import { Home, CreditCard, History, Settings } from "lucide-react";

export default function Sidebar() {
  const [dark, setDark] = useState(false);

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-xl text-purple-600">Controle Fácil</div>
        <nav className="flex flex-col gap-2 px-4">
          <button className="flex items-center gap-2 p-2 rounded-lg bg-purple-100 text-purple-600 font-medium">
            <Home size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <CreditCard size={18} /> Pagamentos
          </button>
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <History size={18} /> Histórico
          </button>
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <Settings size={18} /> Serviços
          </button>
        </nav>
      </div>

      <div className="p-4">
        <div className="bg-purple-100 p-3 rounded-xl text-sm text-purple-700">
          <p>Análise orçamentária</p>
          <p className="text-xs">Upgrade to Pro</p>
        </div>
         <div className="flex gap-2 mt-4 bg-black">
        {/* Botão Claro */}
        <button
            className={`flex-1 rounded-lg border p-2 text-sm transition-colors ${
            !dark
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => setDark(false)}
        >
            Claro
        </button>

        {/* Botão Escuro */}
        <button
            className={`flex-1 rounded-lg border p-2 text-sm transition-colors ${
            dark
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-700 border-gray-300"
            }`}
            onClick={() => setDark(true)}
        >
            Escuro
        </button>
        </div>
      </div>
    </aside>
  );
}
