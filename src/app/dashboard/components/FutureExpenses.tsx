'use client';

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getGastosFuturos, GastoFuturoResponse } from "@/http/api/dashboard/dashboardService";

const getInitials = (label: string): string => {
  return label.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
};

const getColorClass = (index: number): string => {
  const colors = ['bg-purple-300', 'bg-purple-200', 'bg-purple-100', 'bg-purple-50'];
  return colors[index % colors.length];
};

export default function FutureExpenses() {
  const [gastos, setGastos] = useState<GastoFuturoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGastosFuturos = async () => {
      try {
        setLoading(true);
        const data = await getGastosFuturos();
        setGastos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar gastos futuros');
      } finally {
        setLoading(false);
      }
    };

    fetchGastosFuturos();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="text-red-500 text-center">
          Erro ao carregar gastos futuros
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Gastos Futuros</h2>
        <button className="flex items-center gap-2 text-purple-600 font-medium">
          Detalhes <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {gastos.map((gasto, i) => (
          <div
            key={gasto.id}
            className="flex justify-between items-center p-3 rounded-lg bg-purple-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${getColorClass(i)}`}
              >
                {getInitials(gasto.descricao)}
              </div>
              <span className="font-medium">{gasto.descricao}</span>
            </div>
            <span className="text-red-500 font-semibold">
              R$ {Math.abs(gasto.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}