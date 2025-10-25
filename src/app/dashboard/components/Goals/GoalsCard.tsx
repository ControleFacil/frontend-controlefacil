'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Progress from './utils/progress';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  dataLimite: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

interface GoalCardProps {
  goal: Goal;
  customAmount: string;
  onAdd: (id: string, amount: number) => void;
  onCustomChange: (id: string, value: string) => void;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export default function GoalCard({
  goal,
  customAmount,
  onAdd,
  onCustomChange,
  onEdit,
  onDelete,
}: GoalCardProps) {
  const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
  const formattedDate = goal.dataLimite
    ? new Date(`${goal.dataLimite}T00:00:00`).toLocaleDateString('pt-BR')
    : 'Sem data';

  const parsedAmount =
    parseFloat(customAmount.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 250 }}
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md
                 transition-all duration-300 flex flex-col justify-between w-full
                 max-w-[400px] mx-auto sm:max-w-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900 text-lg">{goal.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">Prazo: {formattedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(goal)}
            className="p-1 rounded-full hover:bg-blue-50 text-blue-500 transition"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-1 rounded-full hover:bg-red-50 text-red-500 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="mb-3">
        <Progress value={progress} className="h-2" color={goal.color} />
        <div className="flex justify-between text-xs text-gray-600 mt-1 flex-wrap gap-y-1">
          <span>{progress}% concluído</span>
          <span className="text-right">
            R$ {goal.currentAmount.toLocaleString('pt-BR')} / R$ {goal.targetAmount.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
        <input
          type="text"
          value={customAmount}
          onChange={(e) => onCustomChange(goal.id, e.target.value)}
          placeholder="Ex: 500 ou 250"
          className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 text-center
                     outline-none focus:ring-2 focus:ring-purple-400 transition w-full"
        />
        <div className="flex justify-center sm:justify-end gap-2">
          <button
            onClick={() => onAdd(goal.id, Math.abs(parsedAmount))}
            className="text-sm px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition w-full sm:w-auto"
          >
            +
          </button>
          <button
            onClick={() => onAdd(goal.id, -Math.abs(parsedAmount))}
            className="text-sm px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition w-full sm:w-auto"
          >
            -
          </button>
        </div>
      </div>
    </motion.div>
  );
}
