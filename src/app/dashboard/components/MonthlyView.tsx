"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { mes: "Jan", entrada: 5000, saida: 3200 },
  { mes: "Fev", entrada: 6200, saida: 4100 },
  { mes: "Mar", entrada: 4800, saida: 2900 },
  { mes: "Abr", entrada: 7500, saida: 5100 },
  { mes: "Mai", entrada: 6700, saida: 3700 },
  { mes: "Jun", entrada: 8300, saida: 4892 },
  { mes: "Jul", entrada: 7200, saida: 4200 },
  { mes: "Ago", entrada: 9100, saida: 5600 },
  { mes: "Set", entrada: 8400, saida: 4700 },
  { mes: "Out", entrada: 7800, saida: 3900 },
  { mes: "Nov", entrada: 9800, saida: 5900 },
  { mes: "Dez", entrada: 12800, saida: 2900 },
];

const entradas = data.reduce((acc, item) => acc + item.entrada, 0);
const saidas = data.reduce((acc, item) => acc + item.saida, 0);
const saldo = entradas - saidas;
const saldoAtual = data[data.length - 1].entrada - data[data.length - 1].saida;
const saldoAnterior = data[data.length - 2].entrada - data[data.length - 2].saida;

const diferenca = saldoAtual - saldoAnterior;
export default function MonthlyView() {
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
              stroke="#000"
              strokeWidth={2}
              dot={{ r: 4, fill: "#000" }}
              activeDot={{ r: 6 }}
            />
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
