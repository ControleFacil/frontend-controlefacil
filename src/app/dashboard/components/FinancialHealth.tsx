"use client";

import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getSaudeFinanceira, SaudeFinanceiraResponse } from "@/http/api/dashboard/dashboardService";

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

  const getDicas = (percentual: number) => {
    if (percentual < 30) {
      return [
        "Revise seus gastos fixos e corte o que não for essencial.",
        "Evite parcelamentos longos que comprometem sua renda.",
        "Tente guardar pelo menos 5% do que entra por mês."
      ];
    } else if (percentual < 70) {
      return [
        "Continue controlando seus gastos e tente aumentar suas reservas.",
        "Planeje metas financeiras realistas para os próximos meses.",
        "Considere investir parte do que sobra."
      ];
    } else {
      return [
        "Parabéns! Sua saúde financeira está boa.",
        "Continue investindo e diversificando sua reserva.",
        "Defina objetivos de longo prazo (viagem, casa, aposentadoria)."
      ];
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow animate-pulse">
        <div className="flex justify-between items-center mb-4">
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
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="text-red-500 text-center">
          Erro ao carregar saúde financeira
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Saúde Financeira</h2>
          <button
            onClick={() => setOpen(true)}
            className="text-purple-600 font-medium flex items-center gap-2"
          >
            Detalhes <ArrowRight size={16} />
          </button>
        </div>
        <div className="text-4xl font-bold text-purple-600">
          {saudeFinanceira.percentual}%
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full mt-3">
          <div
            className="h-3 bg-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${saudeFinanceira.percentual}%` }}
          ></div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold text-purple-600 mb-3">
              Como melhorar sua saúde financeira
            </h3>
            <ul className="space-y-2 text-gray-700">
              {getDicas(saudeFinanceira.percentual).map((dica, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  {dica}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
