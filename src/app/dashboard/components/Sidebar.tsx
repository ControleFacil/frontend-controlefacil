"use client";

import { useState } from "react";
import {
  LayoutGrid,
  CreditCard,
  History,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

export default function Sidebar() {
  const [dark, setDark] = useState(false);

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col justify-between rounded-2xl overflow-hidden">
      {/* Logo + título */}
      <div>
        <div className="flex items-center gap-2 p-6">
          <div className=" text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
            <img src="/assets/cflogo.png" alt="" />
          </div>
          <span className="font-semibold text-lg text-gray-800">
            Controle Fácil
          </span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 px-4">
          <button className="flex items-center gap-2 p-3 rounded-xl bg-purple-200 text-purple-800 font-medium">
            <LayoutGrid size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-2 p-3 rounded-xl text-gray-600 hover:bg-gray-100">
            <CreditCard size={18} /> Pagamentos
          </button>
          <button className="flex items-center gap-2 p-3 rounded-xl text-gray-600 hover:bg-gray-100">
            <History size={18} /> Histórico
          </button>
          <button className="flex items-center gap-2 p-3 rounded-xl text-gray-600 hover:bg-gray-100">
            <Settings size={18} /> Serviços
          </button>
        </nav>
      </div>

      {/* Card + Toggle */}
      <div className="p-4">
        {/* Card */}
        <div className="bg-purple-200 p-4 rounded-2xl text-sm text-purple-800 shadow-md">
          <p className="font-medium">Análise orçamentária</p>
          <p className="text-xs mb-2">Uma IA treinada para ajudar você com suas finanças</p>
          <button className="text-xs font-semibold underline">
            Upgrade to Pro
          </button>
        </div>

        {/* Toggle Claro/Escuro */}
        <div className="flex gap-2 mt-4 bg-gray-100 p-1 rounded-xl">
          <button
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 px-4 text-sm font-medium transition-colors ${
              !dark
                ? "bg-purple-300 text-black"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setDark(false)}
          >
            <Sun className="w-4 h-4" />
            Claro
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 px-4 text-sm font-medium transition-colors ${
              dark
                ? "bg-purple-300 text-black"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => setDark(true)}
          >
            <Moon className="w-4 h-4" />
            Escuro
          </button>
        </div>
      </div>
    </aside>
  );
}
