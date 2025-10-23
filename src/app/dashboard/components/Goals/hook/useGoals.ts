'use client';
import { useState, useEffect } from 'react';
import {
  getMetas,
  createMeta,
  updateMeta,
  deleteMeta,
  updateMetaValor,
  MetaResponse,
} from '@/http/api/dashboard/dashboardService';
import { validateDateLimit } from '../utils/dateValidation';

export const useGoals = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const metasData = await getMetas();
        const colors = ['green', 'blue', 'purple', 'red', 'yellow'];
        setGoals(
          metasData.map((meta: MetaResponse, i: number) => ({
            id: meta.id,
            title: meta.titulo,
            targetAmount: meta.meta,
            currentAmount: meta.atual,
            dataLimite: meta.dataLimite,
            color: colors[i % colors.length],
          }))
        );
      } catch (err) {
        setError('Erro ao carregar metas');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleCreate = async (form: any) => {
    if (!validateDateLimit(form.dataLimite))
      throw new Error('Data inválida: selecione um prazo entre hoje e 10 anos.');

    const created = await createMeta({
      descricao: form.descricao,
      valorObjetivo: form.valorObjetivo,
      valorAtual: 0,
      dataLimite: form.dataLimite,
    });
    setGoals((g) => [
      ...g,
      {
        id: created.id,
        title: created.titulo,
        targetAmount: created.meta,
        currentAmount: created.atual,
        dataLimite: created.dataLimite,
      },
    ]);
  };

  const handleUpdate = async (id: string, form: any) => {
    if (!validateDateLimit(form.dataLimite))
      throw new Error('Data inválida: selecione um prazo entre hoje e 10 anos.');

    const updated = await updateMeta(id, form);
    setGoals((g) =>
      g.map((goal) => (goal.id === id ? { ...goal, ...updated } : goal))
    );
  };

  const handleDelete = async (id: string) => {
    await deleteMeta(id);
    setGoals((g) => g.filter((goal) => goal.id !== id));
  };

  const handleValueChange = async (id: string, amount: number) => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    const novoValor = Math.min(goal.targetAmount, goal.currentAmount + amount);
    const updated = await updateMetaValor(id, novoValor);
    setGoals((g) => g.map((x) => (x.id === id ? { ...x, currentAmount: updated.atual } : x)));
  };

  return { goals, loading, error, handleCreate, handleUpdate, handleDelete, handleValueChange };
};
