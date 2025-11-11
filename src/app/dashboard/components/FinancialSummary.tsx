"use client";

import { useEffect, useState } from "react";
import { getVisaoMensal, VisaoMensalResponse } from "@/http/api/dashboard/dashboardService";
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function FinancialSummary() {
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getVisaoMensal();

        const totalEntradas = response.reduce((acc, item) => acc + (item.entrada || 0), 0);
        const totalSaidas = response.reduce((acc, item) => acc + (item.saida || 0), 0);
        const totalSaldo = totalEntradas - totalSaidas;

        setEntradas(totalEntradas);
        setSaidas(totalSaidas);
        setSaldo(totalSaldo);
      } catch (error) {
        console.error("Erro ao carregar resumo financeiro:", error);
      }
    }

    fetchData();
  }, []);

  const cards = [
    {
      title: "Saldo Total",
      value: saldo,
      color: "bg-violet-100 text-violet-700 border-violet-300",
      icon: <DollarSign className="w-8 h-8 text-violet-500" />,
      description:
        saldo >= 0
          ? "Parabéns! Seu saldo geral está positivo."
          : "Atenção: seu saldo geral está negativo.",
    },
    {
      title: "Receita Total",
      value: entradas,
      color: "bg-green-100 text-green-700 border-green-300",
      icon: <ArrowUpCircle className="w-8 h-8 text-green-500" />,
      description: "Total de entradas registradas no sistema",
    },
    {
      title: "Despesas Totais",
      value: saidas,
      color: "bg-red-100 text-red-700 border-red-300",
      icon: <ArrowDownCircle className="w-8 h-8 text-red-500" />,
      description: "Total de saídas acumuladas",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-2xl shadow-sm border ${card.color} p-6 flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{card.title}</h3>
            {card.icon}
          </div>

          <p className="text-3xl font-semibold mt-3">
            R$ {card.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>

          <p className="text-xs mt-2 opacity-80">{card.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
