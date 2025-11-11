"use client";

import { ArrowRight, X, Info, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getSaudeFinanceira, SaudeFinanceiraResponse } from "@/http/api/dashboard/dashboardService";
import { motion, AnimatePresence } from "framer-motion";

export default function FinancialHealth() {
  const [saudeFinanceira, setSaudeFinanceira] = useState<SaudeFinanceiraResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchSaudeFinanceira = async () => {
      try {
        setLoading(true);
        const data = await getSaudeFinanceira();
        setSaudeFinanceira(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar saúde financeira");
      } finally {
        setLoading(false);
      }
    };

    fetchSaudeFinanceira();
  }, []);

  const getNivel = (percentual: number) => {
    if (percentual < 30)
      return { label: "Crítica", color: "text-red-600", icon: <AlertTriangle className="w-5 h-5 text-red-500" /> };
    if (percentual < 70)
      return { label: "Moderada", color: "text-yellow-600", icon: <Info className="w-5 h-5 text-yellow-500" /> };
    return { label: "Saudável", color: "text-green-600", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> };
  };

  const getDicas = (percentual: number) => {
    if (percentual < 30) {
      return [
        "Evite compras por impulso e priorize o essencial. Faça uma lista antes de gastar.",
        "Negocie dívidas antigas — juros altos corroem sua renda mensal rapidamente.",
        "Monte uma reserva de emergência com foco em pequenos depósitos semanais.",
        "Considere usar planilhas ou apps de finanças pessoais para rastrear cada despesa.",
      ];
    } else if (percentual < 70) {
      return [
        "Mantenha o equilíbrio: acompanhe seus gastos semanais e ajuste quando necessário.",
        "Evite aumentar o padrão de consumo antes de consolidar uma reserva sólida.",
        "Crie metas financeiras de curto prazo, como quitar parcelas ou investir R$100/mês.",
        "Estude opções de investimento seguras como CDBs, Tesouro Direto e fundos DI.",
      ];
    } else {
      return [
        "Excelente controle! Continue separando parte da sua renda para investimentos.",
        "Comece a diversificar: fundos imobiliários, renda variável ou previdência privada.",
        "Pense em metas de longo prazo: aposentadoria, viagens ou expansão de negócios.",
        "Mantenha revisões mensais do orçamento para garantir crescimento sustentável.",
      ];
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md animate-pulse">
        <div className="flex justify-between items-center mb-5">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div className="h-3 bg-gray-300 rounded-full w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !saudeFinanceira) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center text-red-600">
        <p>Erro ao carregar saúde financeira</p>
      </div>
    );
  }

  const { percentual } = saudeFinanceira;
  const nivel = getNivel(percentual);

  return (
    <>
      {/* CARD PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Saúde Financeira</h2>
          <button
            onClick={() => setOpen(true)}
            className="text-purple-600 font-medium flex items-center gap-2 hover:text-purple-700 transition"
          >
            Detalhes <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {nivel.icon}
          <span className={`text-sm font-semibold ${nivel.color}`}>{nivel.label}</span>
        </div>

        <div className="mt-2 text-4xl font-extrabold text-purple-600">{percentual}%</div>

        <div className="w-full h-3 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentual}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full shadow-inner"
          ></motion.div>
        </div>

        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          {percentual < 30
            ? "Sua situação financeira está em estado de alerta. É importante rever seus gastos e buscar equilíbrio nas contas."
            : percentual < 70
            ? "Você está no caminho certo! Pequenos ajustes e mais controle podem melhorar ainda mais sua estabilidade."
            : "Excelente! Seu planejamento está consistente e indica uma boa gestão financeira."}
        </p>
      </motion.div>

      {/* MODAL DE DETALHES (com correção do foco e corte) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center overflow-y-auto py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-lg relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-700">
                  Como melhorar sua saúde financeira
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Baseado em sua pontuação atual, identificamos áreas de atenção e boas práticas para fortalecer seu controle financeiro.
              </p>

              <ul className="space-y-3 text-gray-700 text-sm">
                {getDicas(percentual).map((dica, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 p-3 bg-purple-50/60 rounded-lg border border-purple-100 hover:bg-purple-100/70 transition-all"
                  >
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span>{dica}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
