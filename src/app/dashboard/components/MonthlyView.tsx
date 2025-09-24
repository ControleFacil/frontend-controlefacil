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
  const saldoAtual =
    data.length >= 1
      ? (data[data.length - 1].entrada ?? 0) - (data[data.length - 1].saida ?? 0)
      : 0;

  const saldoAnterior =
    data.length >= 2
      ? (data[data.length - 2].entrada ?? 0) - (data[data.length - 2].saida ?? 0)
      : 0;

  const diferenca = saldoAtual - saldoAnterior;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-sm font-medium mb-2">Visão mensal</h2>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="mes" axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ stroke: "#000", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #eee",
              }}
              formatter={(valor: number, nome: string) => [
                `R$ ${valor.toLocaleString("pt-BR")}`,
                nome === "entrada" ? "Entradas" : "Saídas",
              ]}
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Area type="monotone" dataKey="entrada" stroke="none" fill="url(#colorEntrada)" activeDot={false} />
            <Line type="monotone" dataKey="saida" stroke="#000" strokeWidth={2} dot={{ r: 4, fill: "#000" }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <p className="text-lg font-semibold">
          Saldo: R$ {saldo.toLocaleString("pt-BR")}
        </p>
        <p className="text-xs text-gray-500">
          {diferenca >= 0
            ? `R$ ${diferenca.toLocaleString("pt-BR")} a mais que o mês anterior`
            : `R$ ${Math.abs(diferenca).toLocaleString("pt-BR")} a menos que o mês anterior`}
        </p>
      </div>
    </div>
  );
}
