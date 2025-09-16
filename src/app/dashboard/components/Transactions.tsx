import { ArrowRight, Car } from "lucide-react";

export default function Transactions() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Histórico de Transações</h2>
        <button className="flex items-center gap-2 text-purple-600 font-medium">
          Ver tudo <ArrowRight size={16} />
        </button>
      </div>

      {/* Exemplo de transação */}
      <div className="flex justify-between items-center border-b py-3">
        <div className="flex items-center gap-3">
          <Car className="w-6 h-6 text-purple-600" />
          <div>
            <p className="font-medium">Online Taxi Transportation</p>
            <p className="text-xs text-gray-500">11:23</p>
          </div>
        </div>
        <p className="text-red-500 font-semibold">-R$32,21</p>
      </div>
    </div>
  );
}
