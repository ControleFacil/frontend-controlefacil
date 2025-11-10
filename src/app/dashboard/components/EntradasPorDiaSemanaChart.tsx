"use client";

import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getEntradasPorDiaSemana, EntradasPorDiaResponse } from "@/http/api/dashboard/dashboardService";

// Paleta de cores moderna (cada dia uma cor diferente)
const COLORS = ["#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#ec4899", "#6366f1"];

export default function EntradasPorDiaSemanaChart() {
  const [data, setData] = useState<EntradasPorDiaResponse[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getEntradasPorDiaSemana();
        const order = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
        const ordered = order.map(dia => result.find(item => item.diaSemana === dia) || { diaSemana: dia, total: 0 });
        setData(ordered);
      } catch (error) {
        console.error("Erro ao buscar entradas por dia da semana:", error);
      }
    }
    fetchData();
  }, []);

  const totalGeral = useMemo(() => data.reduce((acc, item) => acc + item.total, 0), [data]);

  // Identifica o dia com maior entrada
  const diaMelhor = useMemo(() => {
    if (!data.length) return null;
    return data.reduce((prev, curr) => (curr.total > prev.total ? curr : prev), data[0]);
  }, [data]);

  // Dicas inteligentes para cada dia
  const enhancedData = useMemo(
    () =>
      data.map((item, index) => {
        let dica = "";
        const percentual = totalGeral ? (item.total / totalGeral) * 100 : 0;

        switch (item.diaSemana) {
          case "Segunda":
            dica = percentual < 15 ? "Segunda costuma ser o dia mais movimentado, invista em promoções." : "Segunda está indo bem!";
            break;
          case "Terça":
            dica = percentual < 12 ? "Terça está fraca, considere marketing segmentado." : "Terça está equilibrada.";
            break;
          case "Quarta":
            dica = percentual < 10 ? "Quarta poderia ter mais entradas, use incentivos." : "Quarta está boa.";
            break;
          case "Quinta":
            dica = percentual < 12 ? "Quinta pode melhorar, analise tendências de compra." : "Quinta está bem movimentada.";
            break;
          case "Sexta":
            dica = percentual < 15 ? "Sexta é dia de picos, tente promoções relâmpago." : "Sexta está excelente!";
            break;
          case "Sábado":
            dica = percentual < 18 ? "Sábado é importante para vendas, avalie equipe e horário." : "Sábado está ótimo!";
            break;
          case "Domingo":
            dica = percentual < 10 ? "Domingo poderia melhorar, ofereça incentivos online." : "Domingo equilibrado.";
            break;
        }

        return { ...item, color: COLORS[index % COLORS.length], dica };
      }),
    [data, totalGeral]
  );

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Entradas por Dia da Semana</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={enhancedData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
            <XAxis
              dataKey="diaSemana"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#4b5563", fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              width={80}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: 12 }}
              formatter={(valor: number, name, props: any) => [
                `R$ ${valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                props.payload.diaSemana,
              ]}
              wrapperStyle={{ outline: "none" }}
            />
            <Bar dataKey="total" radius={[8, 8, 0, 0]}>
              {enhancedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-gray-700 text-sm">
          Total geral de entradas:{" "}
          <span className="font-semibold">
            R$ {totalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </p>

        {diaMelhor && (
          <p className="text-gray-700 text-sm font-medium">
            O dia mais movimentado foi <span className="text-purple-600">{diaMelhor.diaSemana}</span> com R${" "}
            {diaMelhor.total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {enhancedData.map((item) => (
            <div key={item.diaSemana} className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-sm font-semibold" style={{ color: item.color }}>
                {item.diaSemana}: R$ {item.total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500">{item.dica}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
