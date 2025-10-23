'use client';

import { ArrowRight, Plus, NotebookPen, Trash2 } from "lucide-react";
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

const getInitials = (label: string): string =>
  label.split(" ").map((w) => w[0]).join("").toUpperCase().substring(0, 2);

const getColorClass = (index: number): string => {
  const colors = ["bg-purple-600", "bg-purple-500", "bg-purple-400", "bg-purple-300"];
  return colors[index % colors.length];
};

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

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Gastos Futuros</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            <Plus size={18} /> Adicionar
          </button>

          <button
            onClick={() => setOpenDetails(true)}
            className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-800"
          >
            Detalhes <ArrowRight size={16} />
          </button>
        </div>
      </div>

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
              className="flex justify-between items-center p-3 rounded-lg bg-purple-50 border border-purple-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${getColorClass(i)}`}
                >
                  {getInitials(g.descricao)}
                </div>
                <span className="font-medium text-gray-800">{g.descricao}</span>
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

      {/* Modais */}
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
