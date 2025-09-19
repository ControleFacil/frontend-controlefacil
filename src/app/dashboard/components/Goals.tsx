'use client';

import { useState, useEffect } from 'react';
import Progress from './ui/progress';
import { getMetas, MetaResponse } from '@/http/api/dashboard/dashboardService';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        setLoading(true);
        const metasData = await getMetas();
        
        const mappedGoals: Goal[] = metasData.map((meta, index) => {
          const colors: ('blue' | 'green' | 'red' | 'yellow' | 'purple')[] = 
            ['green', 'blue', 'purple', 'red', 'yellow'];
          
          return {
            id: meta.id,
            title: meta.titulo,
            targetAmount: meta.meta,
            currentAmount: meta.atual,
            color: colors[index % colors.length]
          };
        });
        
        setGoals(mappedGoals);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar metas');
      } finally {
        setLoading(false);
      }
    };

    fetchMetas();
  }, []);

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

  if (loading) {
    return (
      <section className="bg-white shadow-md rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full"></div>
              <div className="flex justify-between items-center mt-1">
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                <div className="flex space-x-1">
                  <div className="h-6 bg-gray-200 rounded w-10"></div>
                  <div className="h-6 bg-gray-200 rounded w-10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white shadow-md rounded-2xl p-6">
        <div className="text-red-500 text-center">
          Erro ao carregar metas: {error}
        </div>
      </section>
    );
  }

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