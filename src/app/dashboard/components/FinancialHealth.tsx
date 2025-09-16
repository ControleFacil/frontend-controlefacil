import { ArrowRight } from "lucide-react";

export default function FinancialHealth() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Saúde Financeira</h2>
        <button className="text-purple-600 font-medium flex items-center gap-2">
          Detalhes <ArrowRight size={16} />
        </button>
      </div>
      <div className="text-4xl font-bold text-purple-600">85%</div>
      <div className="w-full h-3 bg-gray-200 rounded-full mt-3">
        <div className="h-3 bg-purple-500 rounded-full w-[85%]"></div>
      </div>
    </div>
  );
}
