'use client';

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getSaudeFinanceira, SaudeFinanceiraResponse } from "@/http/api/dashboard/dashboardService";

export default function FinancialHealth() {
  const [saudeFinanceira, setSaudeFinanceira] = useState<SaudeFinanceiraResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSaudeFinanceira = async () => {
      try {
        setLoading(true);
        const data = await getSaudeFinanceira();
        setSaudeFinanceira(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar saúde financeira');
      } finally {
        setLoading(false);
      }
    };

    fetchSaudeFinanceira();
  }, []);

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
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Saúde Financeira</h2>
        <button className="text-purple-600 font-medium flex items-center gap-2">
          Detalhes <ArrowRight size={16} />
        </button>
      </div>
      <div className="text-4xl font-bold text-purple-600">{saudeFinanceira.percentual}%</div>
      <div className="w-full h-3 bg-gray-200 rounded-full mt-3">
        <div 
          className="h-3 bg-purple-500 rounded-full transition-all duration-500" 
          style={{ width: `${saudeFinanceira.percentual}%` }}
        ></div>
      </div>
    </div>
  );
}