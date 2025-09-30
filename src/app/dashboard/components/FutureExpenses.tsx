'use client';

import { ArrowRight, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getGastosFuturos, GastoFuturoResponse, createGastoFuturo } from "@/http/api/dashboard/dashboardService";

const getInitials = (label: string): string => {
  return label.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
};

const getColorClass = (index: number): string => {
  const colors = ['bg-purple-300', 'bg-purple-200', 'bg-purple-100', 'bg-purple-50'];
  return colors[index % colors.length];
};

export default function FutureExpenses() {
  const [gastos, setGastos] = useState<GastoFuturoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  const fetchGastos = async () => {
    try {
      setLoading(true);
      const data = await getGastosFuturos();
      setGastos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar gastos futuros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGastos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createGastoFuturo({ descricao, valor: parseFloat(valor), data });
      setDescricao('');
      setValor('');
      setData('');
      setOpen(false);
      fetchGastos();
    } catch (err) {
      console.error(err);
      alert('Erro ao criar gasto futuro');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Gastos Futuros</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setOpenDetails(true)} 
            className="flex items-center gap-2 text-purple-600 font-medium"
          >
            Detalhes <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Lista resumida */}
      <div className="space-y-3">
        {gastos.map((gasto, i) => (
          <div
            key={gasto.id}
            className="flex justify-between items-center p-3 rounded-lg bg-purple-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${getColorClass(i)}`}
              >
                {getInitials(gasto.descricao)}
              </div>
              <span className="font-medium">{gasto.descricao}</span>
            </div>
            <span className="text-red-500 font-semibold">
              R$ {Math.abs(gasto.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>

      {/* Modal de adicionar gasto */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Adicionar Gasto Futuro</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text" 
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                step="0.01"
                required
              />
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de detalhes gerais */}
      {openDetails && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalhes dos Gastos Futuros</h3>
              <button onClick={() => setOpenDetails(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-purple-100 text-left">
                  <th className="p-2">Descrição</th>
                  <th className="p-2">Valor</th>
                  <th className="p-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {gastos.map((gasto) => (
                  <tr key={gasto.id} className="border-t">
                    <td className="p-2">{gasto.descricao}</td>
                    <td className="p-2 text-red-500 font-semibold">
                      R$ {Math.abs(gasto.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-2">
                      {new Date(gasto.data).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )}
    </div>
  );
}
