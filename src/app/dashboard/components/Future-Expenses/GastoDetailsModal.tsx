'use client';

import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { GastoFuturoResponse } from '@/http/api/dashboard/dashboardService';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface FutureExpensesDetailsProps {
  gastos: GastoFuturoResponse[];
  onClose: () => void;
  onEdit: (gasto: GastoFuturoResponse) => void;
  onDelete: (id: string) => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
};

export default function FutureExpensesDetails({
  gastos,
  onClose,
  onEdit,
  onDelete,
}: FutureExpensesDetailsProps) {
  // Preparar dados para gráfico
  const chartData = Array.isArray(gastos)
    ? gastos
        .map((g) => ({
          name: g.descricao || "Sem descrição",
          valor: g.valor ?? 0,
          data: g.data ? new Date(g.data).toLocaleDateString("pt-BR") : "Data não informada",
        }))
        .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    : [];

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-[650px] max-h-[90vh] overflow-y-auto relative p-8"
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      >
        {/* Logo e título */}
        <motion.div
          className="flex flex-col items-center mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <Image src="/assets/cfLogo.png" alt="Logo" width={70} height={70} className="mb-3" />
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Detalhes dos Gastos Futuros
          </h2>
          <p className="text-gray-500 text-center text-sm mt-1 max-w-[500px] leading-relaxed">
            Acompanhe os próximos gastos planejados, visualize datas e valores, e organize seu
            planejamento financeiro de forma intuitiva.
          </p>
        </motion.div>

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={24} />
        </button>

        {/* Lista animada */}
        <motion.div
          className="space-y-3 mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {gastos.map((gasto, i) => (
            <motion.div
              key={gasto.id}
              custom={i}
              variants={fadeUp}
              className="flex justify-between items-center p-3 rounded-xl bg-purple-50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-medium text-gray-800">{gasto.descricao}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(gasto.data).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-red-500 font-semibold">
                  R$ {Math.abs(gasto.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <button onClick={() => onEdit(gasto)} className="text-purple-600 hover:text-purple-800">
                  Editar
                </button>
                <button onClick={() => onDelete(gasto.id)} className="text-red-500 hover:text-red-700">
                  Excluir
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gráfico */}
        <motion.div
          className="bg-white rounded-xl p-4 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Projeção de Gastos por Data</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="data" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
              <Bar dataKey="valor" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
