import { ArrowRight } from "lucide-react";

const expenses = [
  { label: "Parcela financiamento", value: "-R$ 1000,00", color: "bg-purple-300", short: "H" },
  { label: "Energia", value: "-R$ 550,00", color: "bg-purple-200", short: "S" },
  { label: "Internet", value: "-R$ 550,00", color: "bg-purple-200", short: "N" },
  { label: "Água", value: "-R$ 550,00", color: "bg-purple-200", short: "P" },
];

export default function FutureExpenses() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Gastos Futuros</h2>
        <button className="flex items-center gap-2 text-purple-600 font-medium">
          Detalhes <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {expenses.map((exp, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 rounded-lg bg-purple-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${exp.color}`}
              >
                {exp.short}
              </div>
              <span className="font-medium">{exp.label}</span>
            </div>
            <span className="text-red-500 font-semibold">{exp.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
