'use client';

import { useState, useEffect } from 'react';
import { Plus, Target, TrendingUp } from 'lucide-react';
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

  const [createForm, setCreateForm] = useState({
    descricao: "",
    valorObjetivo: null as number | null,
    dataLimite: "",
  });

  const [editForm, setEditForm] = useState({
    descricao: '',
    valorObjetivo: null as number | null,
    valorAtual: null as number | null,
    dataLimite: '',
  });

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        setLoading(true);
        const metasData = await getMetas();
        const colors: ('green' | 'blue' | 'purple' | 'red' | 'yellow')[] = [
          'green', 'blue', 'purple', 'red', 'yellow',
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

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const progress = totalTarget ? Math.round((totalCurrent / totalTarget) * 100) : 0;

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

    if (!descricao.trim() || !dataLimite.trim() || !valorObjetivo || valorObjetivo <= 0)
      return alert('Preencha todos os campos corretamente');

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
      className="bg-white shadow-xl rounded-2xl p-8 space-y-8 border border-gray-100"
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Metas Financeiras</h2>
          <p className="text-sm text-gray-500 mt-1">
            Acompanhe seu progresso e gerencie seus objetivos financeiros de forma inteligente.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all shadow-md"
        >
          <Plus size={18} />
          Nova Meta
        </motion.button>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
          <div className="flex items-center gap-2 text-purple-700 font-medium">
            <Target size={18} /> Total de Metas
          </div>
          <p className="text-2xl font-semibold text-purple-900 mt-1">{goals.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <div className="flex items-center gap-2 text-blue-700 font-medium">
            <TrendingUp size={18} /> Progresso Total
          </div>
          <p className="text-2xl font-semibold text-blue-900 mt-1">{progress}%</p>
        </div>
        <div className="p-4 rounded-xl bg-green-50 border border-green-100">
          <div className="flex items-center gap-2 text-green-700 font-medium">
            <TrendingUp size={18} /> Valor Acumulado
          </div>
          <p className="text-2xl font-semibold text-green-900 mt-1">
            R$ {totalCurrent.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* GRID DE METAS */}
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
