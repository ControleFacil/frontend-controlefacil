"use client";

import { usePeriodo } from "@/context/PeriodoContext";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export default function DateRangeSelector() {

  const { setPeriodo } = usePeriodo();

  const criarPeriodo = (dias: number) => {
    const fim = new Date();
    const inicio = new Date();

    inicio.setDate(fim.getDate() - dias);

    setPeriodo({
      inicio: formatDate(inicio),
      fim: formatDate(fim)
    });
  };

  return (
    <div className="flex items-center gap-3">

      <button
        onClick={() => criarPeriodo(7)}
        className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition"
      >
        Últimos 7 dias
      </button>

      <button
        onClick={() => criarPeriodo(30)}
        className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition"
      >
        Últimos 30 dias
      </button>

      <button
        onClick={() => criarPeriodo(90)}
        className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition"
      >
        Últimos 90 dias
      </button>

      <input
        type="date"
        max={formatDate(new Date())}
        onChange={(e) =>
          setPeriodo((prev) => ({
            ...prev,
            inicio: e.target.value
          }))
        }
        className="border rounded px-2 py-1"
      />

      <input
        type="date"
        max={formatDate(new Date())}
        onChange={(e) =>
          setPeriodo((prev) => ({
            ...prev,
            fim: e.target.value
          }))
        }
        className="border rounded px-2 py-1"
      />

    </div>
  );
}