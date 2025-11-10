'use client';

import { ArrowRight, Plus, NotebookPen, Trash2, CalendarDays, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getGastosFuturos,
  createGastoFuturo,
  updateGastoFuturo,
  deleteGastoFuturo,
  GastoFuturoResponse,
} from "@/http/api/dashboard/dashboardService";
import GastoFormModal from "./GastoFormModal";
import GastoDetailsModal from "./GastoDetailsModal";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const getInitials = (label: string): string =>
  label.split(" ").map((w) => w[0]).join("").toUpperCase().substring(0, 2);

export default function FutureExpenses() {
  const [gastos, setGastos] = useState<GastoFuturoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [editing, setEditing] = useState<GastoFuturoResponse | null>(null);

  const fetchGastos = async () => {
    setLoading(true);
    try {
      const data = await getGastosFuturos();
      setGastos(data);
    } catch {
      alert("Erro ao carregar gastos futuros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGastos();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente excluir este gasto futuro?")) {
      try {
        await deleteGastoFuturo(id);
        fetchGastos();
      } catch {
        alert("Erro ao excluir gasto futuro.");
      }
    }
  };

  // --- Estatísticas rápidas ---
  const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0);
  const mediaGasto = gastos.length ? totalGastos / gastos.length : 0;
  const proximoGasto = gastos.length
    ? gastos.slice().sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())[0]
    : null;

  const chartData = gastos
    .map((g) => ({
      name: g.descricao,
      valor: g.valor,
      data: new Date(g.data).toLocaleDateString("pt-BR"),
    }))
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Gastos Futuros</h2>
          <p className="text-gray-500">
            Visualize, edite e organize seus compromissos financeiros planejados.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            <Plus size={18} /> Adicionar gasto
          </button>
          <button
            onClick={() => setOpenDetails(true)}
            className="flex items-center gap-2 text-purple-700 font-medium hover:text-purple-900 transition"
          >
            Ver detalhes <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* DASHBOARD DE RESUMO */}
      {!loading && gastos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-5 bg-purple-50 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-gray-600 text-sm mb-1">Total previsto</p>
            <h3 className="text-2xl font-bold text-purple-700">
              R$ {totalGastos.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-5 bg-purple-50 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-gray-600 text-sm mb-1">Média por gasto</p>
            <h3 className="text-2xl font-bold text-purple-700">
              R$ {mediaGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-5 bg-purple-50 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
              <CalendarDays size={16} /> Próximo pagamento
            </p>
            {proximoGasto ? (
              <h3 className="text-lg font-semibold text-purple-700">
                {proximoGasto.descricao} — {new Date(proximoGasto.data).toLocaleDateString("pt-BR")}
              </h3>
            ) : (
              <p className="text-gray-500 text-sm">Nenhum gasto agendado</p>
            )}
          </div>
        </div>
      )}

      {/* GRÁFICO RESUMIDO */}
      {!loading && gastos.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <TrendingDown size={16} /> Evolução dos gastos planejados
          </h4>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="data" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
              <Area type="monotone" dataKey="valor" stroke="#7C3AED" fill="#C4B5FD" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* LISTAGEM DE GASTOS */}
      {loading ? (
        <p className="text-gray-500 text-center">Carregando...</p>
      ) : gastos.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum gasto futuro cadastrado.</p>
      ) : (
        <div className="space-y-3">
          {gastos.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center p-4 rounded-lg bg-purple-50 border border-purple-100 hover:shadow-md transition"
            >
              <div>
                <h4 className="font-medium text-gray-800">{g.descricao}</h4>
                <p className="text-gray-500 text-sm">
                  {new Date(g.data).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-red-500 font-semibold">
                  R$ {Math.abs(g.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
                <button
                  onClick={() => {
                    setEditing(g);
                    setOpenForm(true);
                  }}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <NotebookPen size={18} />
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODAIS */}
      <AnimatePresence>
        {openForm && (
          <GastoFormModal
            editing={editing || undefined}
            onClose={() => setOpenForm(false)}
            onSave={fetchGastos}
            createGastoFuturo={createGastoFuturo}
            updateGastoFuturo={updateGastoFuturo}
          />
        )}
        {openDetails && (
          <GastoDetailsModal
            gastos={gastos}
            onClose={() => setOpenDetails(false)}
            onEdit={(g) => {
              setEditing(g);
              setOpenDetails(false);
              setOpenForm(true);
            }}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
