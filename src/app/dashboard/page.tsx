"use client";

import React from "react";
import Image from "next/image";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Home, CreditCard, BarChart2, Clock, Settings } from "lucide-react";

const data = [
  { name: "Jan", value: 3000 },
  { name: "Feb", value: 4000 },
  { name: "Mar", value: 2800 },
  { name: "Apr", value: 5000 },
  { name: "May", value: 4200 },
  { name: "Jun", value: 4800 },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col p-4">
        <div className="flex items-center gap-2 mb-8">
          <Image src="/assets/logo.png" alt="Logo" width={40} height={40} />
          <span className="font-bold text-lg">Controle Fácil</span>
        </div>

        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-100 text-purple-600">
            <Home size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-purple-600">
            <CreditCard size={18} /> Pagamentos
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-purple-600">
            <BarChart2 size={18} /> Análises
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-purple-600">
            <Clock size={18} /> Histórico
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-purple-600">
            <Settings size={18} /> Configurações
          </button>
        </nav>

        <div className="mt-auto">
          <div className="bg-gray-100 rounded-xl p-3 text-sm">
            <p className="font-medium">Trade smarter with Finance AI</p>
            <button className="mt-2 w-full bg-purple-600 text-white py-1 rounded-lg text-xs">
              Upgrade to Pro
            </button>
          </div>
          <div className="flex justify-between items-center mt-4 text-xs">
            <span>Claro</span>
            <span className="px-2 py-1 bg-gray-200 rounded-lg">Escuro</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Bem-vindo! Victor Santos</h1>
            <p className="text-sm text-gray-500">11 Nov – 11 Dez, 2025</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
            + Adicionar
          </button>
        </header>

        {/* Top Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow">Saúde</div>
          <div className="bg-white rounded-xl p-4 shadow">Mercado</div>
          <div className="bg-white rounded-xl p-4 shadow">Lazer</div>
          <div className="bg-white rounded-xl p-4 shadow">Casa</div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-medium mb-4">Visão mensal</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#a855f7" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 mt-2">
                R$34.742,00 – são R$ 5.000,00 a menos que o mês anterior
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-medium mb-2">Histórico de transações</h3>
              <p className="text-sm">Online Taxi Transportation - R$32,21</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div className="bg-purple-100 p-4 rounded-xl shadow">
              <h3 className="font-medium">Cartão</h3>
              <p className="text-lg">1234 5678 8910 XXXX</p>
              <span className="text-xs text-gray-600">Val. 22/27</span>
            </div>

            <div className="bg-pink-100 p-4 rounded-xl shadow">
              <h3 className="font-medium">Fatura mensal</h3>
              <p className="text-lg">R$ 20.000</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-medium">Gastos futuros</h3>
              <ul className="text-sm space-y-2 mt-2">
                <li className="flex justify-between">
                  <span>Parcela financiamento</span>
                  <span>-R$ 1.000,00</span>
                </li>
                <li className="flex justify-between">
                  <span>Energia</span>
                  <span>-R$ 550</span>
                </li>
                <li className="flex justify-between">
                  <span>Internet</span>
                  <span>-R$ 550</span>
                </li>
                <li className="flex justify-between">
                  <span>Água</span>
                  <span>-R$ 550</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
