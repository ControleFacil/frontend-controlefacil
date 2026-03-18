"use client";

import Sidebar from "@/app/dashboard/components/Sidebar";
import Dividas from "../components/Dividas/Dividas";
import { motion } from "framer-motion";

export default function DividasPage() {
  return (
    <div className="flex h-screen bg-gray-100 p-6 gap-6">

      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo */}
      <main className="flex-1 overflow-y-auto space-y-10">

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
        >
          <div className="space-y-4">

            <h1 className="text-3xl font-semibold text-gray-800">
              Dívidas e Parcelamentos
            </h1>

            <p className="text-gray-500 leading-relaxed max-w-2xl">
              Acompanhe todas as suas dívidas, visualize parcelas pagas e
              mantenha controle total sobre seus compromissos financeiros.
              Organize seus pagamentos e evite surpresas no orçamento.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 text-sm mt-2">

              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                Controle financeiro
              </span>

              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
                Parcelamentos
              </span>

              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                Compromissos financeiros
              </span>

              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                Organização
              </span>

            </div>

          </div>
        </motion.header>

        {/* INFO CARDS */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-gray-500 text-sm">
              Controle total
            </h3>

            <p className="text-lg font-semibold text-gray-800 mt-2">
              Gerencie todas as suas dívidas
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Visualize parcelas, valores restantes e pagamentos realizados.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-purple-500 text-sm">
              Parcelamentos
            </h3>

            <p className="text-lg font-semibold text-gray-800 mt-2">
              Acompanhe suas parcelas
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Saiba exatamente quantas parcelas já foram pagas.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border border-red-100 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-red-500 text-sm">
              Organização financeira
            </h3>

            <p className="text-lg font-semibold text-gray-800 mt-2">
              Evite atrasos
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Tenha visão clara das suas obrigações financeiras.
            </p>
          </motion.div>

        </motion.section>

        {/* LISTA DE DÍVIDAS */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Dividas />
        </motion.section>

      </main>

    </div>
  );
}