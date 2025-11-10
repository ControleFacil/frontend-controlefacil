"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState, useMemo } from "react";
import { getGastosPorCategoria } from "@/http/api/dashboard/dashboardService";

// Exemplo de tipagem da resposta da API
export interface CategoriaGastoResponse {
  categoria: string;
  valor: number;
}

// Cores para cada categoria
const COLORS = [
  "#8b5cf6", // Alimentação
  "#10b981", // Transporte
  "#f59e0b", // Moradia
  "#ef4444", // Saúde
  "#3b82f6", // Educação
  "#ec4899", // Lazer
  "#6366f1", // Salário
  "#14b8a6", // Freelance
  "#84cc16", // Investimentos
  "#6b7280", // Geral
];

export default function CategoryExpenses() {
  const [data, setData] = useState<CategoriaGastoResponse[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getGastosPorCategoria(); // retorna array { categoria, valor }
        setData(response);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  // Total geral
  const total = useMemo(() => data.reduce((acc, item) => acc + item.valor, 0), [data]);

  // Porcentagem e dicas inteligentes
  const enhancedData = useMemo(
    () =>
      data.map((item, index) => {
        const percentual = total > 0 ? (item.valor / total) * 100 : 0;
        let dica = "";

        if (item.categoria === "Lazer" && percentual > 20)
          dica = "Você pode reduzir gastos com lazer para equilibrar o orçamento.";
        else if (item.categoria === "Alimentação" && percentual > 30)
          dica = "Considere planejar melhor as compras e evitar desperdícios.";
        else if (item.categoria === "Transporte" && percentual > 25)
          dica = "Pense em alternativas como caronas ou transporte público.";
        else if (item.categoria === "Investimentos" && percentual < 10)
          dica = "Invista mais para fortalecer sua reserva financeira.";
        else if (item.categoria === "Saúde" && percentual < 5)
          dica = "Cuide-se! Gastos baixos podem indicar pouca atenção à saúde.";

        return { ...item, percentual, dica, color: COLORS[index % COLORS.length] };
      }),
    [data, total]
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-medium mb-2">Distribuição de Gastos por Categoria</h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={enhancedData}
              dataKey="valor"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              paddingAngle={4}
              label={({ payload }: any) =>
                `${payload.categoria} (${payload.percentual.toFixed(1)}%)`
              }
            >
              {enhancedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #eee",
              }}
              formatter={(valor: number, _, item: any) => [
                `R$ ${valor.toLocaleString("pt-BR")}`,
                item.payload.categoria,
              ]}
              labelFormatter={() => ""}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">
          Total de gastos:{" "}
          <span className="font-semibold text-gray-800">
            R$ {total.toLocaleString("pt-BR")}
          </span>
        </p>

        <div className="space-y-2">
          {enhancedData.map((item) => (
            <div
              key={item.categoria}
              className="flex items-center gap-2 bg-gray-50 rounded-lg p-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.categoria}</p>
                <p className="text-xs text-gray-500">
                  {item.dica || "Categoria equilibrada."}
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                {item.percentual.toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
