'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import {
  getMetas,
  createMeta,
  updateMeta,
  deleteMeta,
  updateMetaValor,
  MetaResponse,
} from '@/http/api/dashboard/dashboardService';
import GoalCard from './GoalsCard';
import GoalFormCreate from './GoalsFormCreate';
import GoalFormEdit from './GoalsFormEdit';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  dataLimite: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customAmounts, setCustomAmounts] = useState<{ [key: string]: number }>({});
  const [editing, setEditing] = useState<Goal | null>(null);
  const [creating, setCreating] = useState(false);

  const [createForm, setCreateForm] = useState<{
    descricao: string;
    valorObjetivo: number | null;
    dataLimite: string;
  }>({
    descricao: "",
    valorObjetivo: null,
    dataLimite: "",
  });
  const [editForm, setEditForm] = useState<{
    descricao: string;
    valorObjetivo: number | null;
    valorAtual: number | null;
    dataLimite: string;
  }>({
    descricao: '',
    valorObjetivo: null,
    valorAtual: null,
    dataLimite: '',
  });
  useEffect(() => {
    const fetchMetas = async () => {
      try {
        setLoading(true);
        const metasData = await getMetas();
        const colors: ('green' | 'blue' | 'purple' | 'red' | 'yellow')[] = [
          'green',
          'blue',
          'purple',
          'red',
          'yellow',
        ];
        const mappedGoals: Goal[] = metasData.map((meta: MetaResponse, index) => ({
          id: meta.id,
          title: meta.titulo,
          targetAmount: meta.meta,
          currentAmount: meta.atual,
          dataLimite: meta.dataLimite,
          color: colors[index % colors.length],
        }));
        setGoals(mappedGoals);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar metas');
      } finally {
        setLoading(false);
      }
    };
    fetchMetas();
  }, []);

  const addToGoal = async (id: string, amount: number) => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    const novoValor = Math.min(goal.targetAmount, goal.currentAmount + amount);
    try {
      const updated = await updateMetaValor(id, novoValor);
      setGoals(goals.map((g) => (g.id === id ? { ...g, currentAmount: updated.atual } : g)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCustomChange = (id: string, value: string) =>
    setCustomAmounts({ ...customAmounts, [id]: Number(value) || 0 });

  const handleCreate = async () => {
    const { descricao, valorObjetivo, dataLimite } = createForm;

    if (
      !descricao.trim() ||
      !dataLimite.trim() ||
      valorObjetivo === null ||
      valorObjetivo <= 0
    ) {
      return alert('Preencha todos os campos corretamente');
    }

    try {
      const payload = {
        descricao: descricao.trim(),
        valorObjetivo,
        valorAtual: 0,
        dataLimite: dataLimite.trim(),
      };
      const created = await createMeta(payload);

      setGoals([
        ...goals,
        {
          id: created.id,
          title: created.titulo,
          targetAmount: created.meta,
          currentAmount: created.atual,
          dataLimite: created.dataLimite,
        },
      ]);

      setCreating(false);
      setCreateForm({ descricao: '', valorObjetivo: null, dataLimite: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditing(goal);
    setEditForm({
      descricao: goal.title,
      valorObjetivo: goal.targetAmount,
      valorAtual: goal.currentAmount,
      dataLimite: goal.dataLimite,
    });
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const { descricao, valorObjetivo, valorAtual, dataLimite } = editForm;

    if (
      !descricao.trim() ||
      !dataLimite.trim() ||
      valorObjetivo === null ||
      valorAtual === null ||
      valorObjetivo <= 0
    ) {
      return alert('Preencha todos os campos corretamente');
    }

    if (valorObjetivo < valorAtual)
      return alert('O valor objetivo não pode ser menor que o atual');

    try {
      const payload = {
        descricao: descricao.trim(),
        valorObjetivo,
        valorAtual,
        dataLimite: dataLimite.trim(),
      };
      const updated = await updateMeta(editing.id, payload);
      setGoals(goals.map((g) => (g.id === editing.id ? { ...g, ...updated } : g)));
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return;
    try {
      await deleteMeta(id);
      setGoals(goals.filter((g) => g.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-gray-500 text-sm text-center">Carregando metas...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Metas</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
        >
          <Plus size={18} />
          Adicionar Meta
        </motion.button>
      </div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={fadeUp}
        transition={{ staggerChildren: 0.1 }}
      >
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            customAmount={String(customAmounts[goal.id] || '')}
            onAdd={addToGoal}
            onCustomChange={handleCustomChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </motion.div>

      {creating && (
        <GoalFormCreate
          createForm={createForm}
          setCreateForm={setCreateForm}
          handleCreate={handleCreate}
          setCreating={setCreating}
        />
      )}
      {editing && (
        <GoalFormEdit
          editForm={editForm}
          setEditForm={setEditForm}
          handleUpdate={handleUpdate}
          setEditing={setEditing}
        />
      )}
    </motion.section>
  );
}
