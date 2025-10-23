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
  customAmount: number;
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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-base">{goal.title}</h3>
          <p className="text-xs text-gray-500 mt-1">
            Prazo: {goal.dataLimite ? new Date(`${goal.dataLimite}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onEdit(goal)} className="text-blue-500 hover:text-blue-700">
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(goal.id)} className="text-red-500 hover:text-red-700">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <Progress value={progress} className="h-2 mb-2" color={goal.color} />

      <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
        <span>{progress}% concluído</span>
        <span>
          R$ {goal.currentAmount.toLocaleString('pt-BR')} / R$ {goal.targetAmount.toLocaleString('pt-BR')}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={customAmount || ''}
          onChange={(e) => onCustomChange(goal.id, e.target.value)}
          placeholder="+ valor"
          className="w-20 text-xs border border-gray-300 rounded-lg px-2 py-1 text-center outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <button
          onClick={() => onAdd(goal.id, Math.abs(Number(customAmount)))}
          className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
        >
          + OK
        </button>
        <button
          onClick={() => onAdd(goal.id, -Math.abs(Number(customAmount)))}
          className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
        >
          - OK
        </button>
      </div>
    </motion.div>
  );
}
