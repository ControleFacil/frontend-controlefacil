'use client';

import { useState } from 'react';
import Progress from './ui/progress';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Fundo de Emergência',
      targetAmount: 10000,
      currentAmount: 7000,
      color: 'green'
    },
    {
      id: '2',
      title: 'Carro Novo',
      targetAmount: 50000,
      currentAmount: 20000,
      color: 'blue'
    },
    {
      id: '3',
      title: 'Férias',
      targetAmount: 5000,
      currentAmount: 2750,
      color: 'purple'
    },
  ]);

  const calculateProgress = (current: number, target: number): number => {
    return Math.round((current / target) * 100);
  };

  const addToGoal = (id: string, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, currentAmount: Math.min(goal.targetAmount, goal.currentAmount + amount) } 
        : goal
    ));
  };

  return (
    <section className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-black mb-4">Metas</h2>

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          
          return (
            <div key={goal.id}>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-600">{goal.title}</p>
                <span className="text-xs text-gray-500">
                  R$ {goal.currentAmount.toLocaleString('pt-BR')} / R$ {goal.targetAmount.toLocaleString('pt-BR')}
                </span>
              </div>
              <Progress value={progress} className="h-2" color={goal.color} />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">{progress}% concluído</span>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => addToGoal(goal.id, 100)}
                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                  >
                    +100
                  </button>
                  <button 
                    onClick={() => addToGoal(goal.id, 500)}
                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                  >
                    +500
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Resumo</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2 bg-blue-50 rounded text-center">
            <p className="text-gray-600">Total</p>
            <p className="font-semibold">R$ {goals.reduce((acc, goal) => acc + goal.currentAmount, 0).toLocaleString('pt-BR')}</p>
          </div>
          <div className="p-2 bg-green-50 rounded text-center">
            <p className="text-gray-600">Concluído</p>
            <p className="font-semibold">
              {Math.round(goals.reduce((acc, goal) => acc + goal.currentAmount, 0) / goals.reduce((acc, goal) => acc + goal.targetAmount, 0) * 100)}%
            </p>
          </div>
          <div className="p-2 bg-purple-50 rounded text-center">
            <p className="text-gray-600">Restante</p>
            <p className="font-semibold">
              R$ {goals.reduce((acc, goal) => acc + (goal.targetAmount - goal.currentAmount), 0).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}