"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  CreditCard,
  History,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { name: "Transações", icon: CreditCard, href: "/dashboard/pagamentos" },
  { name: "Metas e Gastos Futuros", icon: History, href: "/dashboard/metas-e-gastos" },
  { name: "Serviços", icon: Settings, href: "/dashboard/servicos" },
  { name: "Configurações", icon: Settings, href: "/dashboard/configuracoes" },
];

export default function Sidebar() {
  const [dark, setDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Olá! Quero registrar uma nova transação no Controle Fácil 💰"
    );
    window.open(`https://wa.me/559984932799?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Botão hambúrguer mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-md flex flex-col justify-between rounded-2xl overflow-hidden z-50
          w-64 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:w-64
        `}
      >
        <div>
          <div className="flex items-center gap-2 p-6">
            <div className="text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
              <img src="/assets/cfLogo.png" alt="Logo" />
            </div>
            <span className="font-semibold text-lg text-gray-800">
              Controle Fácil
            </span>
            <button
              className="md:hidden ml-auto"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 px-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-purple-200 text-purple-800 scale-105"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4">
          {/* Seção do bot de registro de transações */}
          <div className="bg-green-100 border border-green-300 p-4 rounded-2xl text-sm text-green-900 shadow-md">
            <p className="font-semibold text-base mb-1 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-700" />
              Bot de Registro Financeiro
            </p>
            <p className="text-xs mb-3 text-green-800">
              Registre entradas e saídas de forma rápida pelo WhatsApp, sem precisar abrir o painel.
            </p>
            <button
              onClick={openWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Registrar via WhatsApp
            </button>
          </div>

          {/* Tema */}
          <div className="flex gap-2 mt-4 bg-gray-100 p-1 rounded-xl">
            <button
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 px-4 text-sm font-medium transition-colors ${
                !dark ? "bg-purple-300 text-black" : "bg-transparent text-gray-400"
              }`}
              onClick={() => setDark(false)}
            >
              <Sun className="w-4 h-4" />
              Claro
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 px-4 text-sm font-medium transition-colors ${
                dark ? "bg-purple-300 text-black" : "bg-transparent text-gray-400"
              }`}
              onClick={() => setDark(true)}
            >
              <Moon className="w-4 h-4" />
              Escuro
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
