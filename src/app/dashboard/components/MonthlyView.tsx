import { Filter, ArrowRight } from "lucide-react";

export default function MonthlyView() {
  return (
    <div className="bg-white p-6 rounded-xl shadow col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Visão Mensal</h2>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 text-purple-600 font-medium">
            Detalhes <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Placeholder gráfico */}
      <div className="bg-purple-50 rounded-xl h-40 flex items-center justify-center text-purple-500">
        [ Gráfico Mensal Aqui ]
      </div>

      <p className="mt-4 text-sm text-gray-600">
        R$34.742,00 <span className="text-red-500">↓ R$5.500</span> a menos que o mês anterior
      </p>
    </div>
  );
}
