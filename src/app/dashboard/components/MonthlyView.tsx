"use client";

import {
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useEffect, useState } from "react";
import { getVisaoMensal, VisaoMensalResponse } from "@/http/api/dashboard/dashboardService";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function MonthlyView() {
  const [data, setData] = useState<VisaoMensalResponse[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getVisaoMensal();
        const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
        const dataFormatada = meses.map((mes) => {
          const item = response.find(
            (r) => r.mes.replace(".", "").toLowerCase() === mes.toLowerCase()
          );
          return {
            mes,
            entrada: item?.entrada ?? 0,
            saida: item?.saida ?? 0,
          };
        });
        setData(dataFormatada);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const entradas = data.reduce((acc, item) => acc + item.entrada, 0);
  const saidas = data.reduce((acc, item) => acc + item.saida, 0);
  const saldo = entradas - saidas;
  const mesesComMovimento = data.filter(item => item.entrada > 0 || item.saida > 0);

  let saldoAtual = 0;
  let saldoAnterior = 0;

  if (mesesComMovimento.length > 0) {
    const ultimo = mesesComMovimento[mesesComMovimento.length - 1];
    saldoAtual = ultimo.entrada - ultimo.saida;

    if (mesesComMovimento.length > 1) {
      const penultimo = mesesComMovimento[mesesComMovimento.length - 2];
      saldoAnterior = penultimo.entrada - penultimo.saida;
    }
  }

  const diferenca = saldoAtual - saldoAnterior;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Visão Anual</h2>
        <span className="text-sm text-gray-500">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </span>
      </div>

      {/* Gráfico */}
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: "#ddd", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #f3f4f6",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              formatter={(valor: number, nome: string) => [
                `R$ ${valor.toLocaleString("pt-BR")}`,
                nome === "entrada" ? "Entradas" : "Saídas",
              ]}
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="entrada"
              stroke="none"
              fill="url(#colorEntrada)"
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="saida"
              stroke="#1f2937"
              strokeWidth={2}
              dot={{ r: 3, fill: "#1f2937" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Informações resumidas */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
          <ArrowUpCircle className="text-green-600" />
          <div>
            <p className="text-xs text-gray-500">Entradas</p>
            <p className="text-sm font-semibold text-gray-800">
              R$ {entradas.toLocaleString("pt-BR")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
          <ArrowDownCircle className="text-red-600" />
          <div>
            <p className="text-xs text-gray-500">Saídas</p>
            <p className="text-sm font-semibold text-gray-800">
              R$ {saidas.toLocaleString("pt-BR")}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-purple-50 border border-purple-200 rounded-xl p-3">
          <p className="text-xs text-gray-500">Saldo Atual</p>
          <p className="text-sm font-semibold text-gray-800">
            R$ {saldo.toLocaleString("pt-BR")}
          </p>
          <span
            className={`text-xs ${
              diferenca >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {diferenca >= 0
              ? `+R$ ${diferenca.toLocaleString("pt-BR")} vs mês anterior`
              : `-R$ ${Math.abs(diferenca).toLocaleString("pt-BR")} vs mês anterior`}
          </span>
        </div>
      </div>
    </div>
  );
}
