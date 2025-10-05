'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import Progress from './ui/progress';
import {
  getMetas,
  createMeta,
  updateMeta,
  deleteMeta,
  updateMetaValor,
  MetaResponse,
} from '@/http/api/dashboard/dashboardService';

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

  // Estados separados
  const [editing, setEditing] = useState<Goal | null>(null);
  const [creating, setCreating] = useState(false);

  // Form para criar
  const [createForm, setCreateForm] = useState({
    descricao: '',
    valorObjetivo: 0,
    dataLimite: '',
  });

  // Form para editar
  const [editForm, setEditForm] = useState({
    descricao: '',
    valorObjetivo: 0,
    valorAtual: 0,
    dataLimite: '',
  });

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        setLoading(true);
        const metasData = await getMetas();

        const colors: ('green' | 'blue' | 'purple' | 'red' | 'yellow')[] = 
          ['green', 'blue', 'purple', 'red', 'yellow'];

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

  const calculateProgress = (current: number, target: number): number => {
    return Math.round((current / target) * 100);
  };

  const addToGoal = async (id: string, amount: number) => {
    try {
      const goal = goals.find((g) => g.id === id);
      if (!goal) return;

      const novoValor = Math.min(goal.targetAmount, goal.currentAmount + amount);

      const updated = await updateMetaValor(id, novoValor);

      setGoals(
        goals.map((g) =>
          g.id === id ? { ...g, currentAmount: updated.atual } : g
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar meta:', err);
    }
  };

  const handleCustomChange = (id: string, value: string) => {
    setCustomAmounts({
      ...customAmounts,
      [id]: Number(value) || 0,
    });
  };


  const handleCreate = async () => {
      const { descricao, valorObjetivo, dataLimite } = createForm;

      if (!descricao.trim() || !dataLimite.trim() || valorObjetivo <= 0) {
        alert('Preencha todos os campos obrigatórios corretamente.');
        return;
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
        setCreateForm({ descricao: '', valorObjetivo: 0, dataLimite: '' });
      } catch (err) {
        console.error('Erro ao criar meta:', err);
      }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const { descricao, valorObjetivo, valorAtual, dataLimite } = editForm;

    if (!descricao.trim() || !dataLimite.trim() || valorObjetivo <= 0) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    if (valorObjetivo < valorAtual) {
      alert('O valor objetivo não pode ser menor que o valor atual.');
      return;
    }

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
      console.error('Erro ao atualizar meta:', err);
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditing(goal);
    setEditForm({
      descricao: goal.title,
      valorObjetivo: goal.targetAmount,
      valorAtual: goal.currentAmount,
      dataLimite: goal.dataLimite || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta meta?')) return;
    try {
      await deleteMeta(id);
      setGoals(goals.filter((g) => g.id !== id));
    } catch (err) {
      console.error('Erro ao deletar meta:', err);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="bg-white shadow-md rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black">Metas</h2>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
        >
          <Plus size={16} /> Adicionar Meta
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const customValue = customAmounts[goal.id] || 0;

          return (
            <div key={goal.id} className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-600">{goal.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    R$ {goal.currentAmount.toLocaleString('pt-BR')} / R$ {goal.targetAmount.toLocaleString('pt-BR')}
                  </span>
                  <button onClick={() => handleEdit(goal)} className="text-blue-500 hover:text-blue-700">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(goal.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <Progress value={progress} className="h-2" color={goal.color} />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">{progress}% concluído</span>
                <div className="flex space-x-1 items-center">
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
                  <input
                    type="number"
                    value={customValue}
                    onChange={(e) => handleCustomChange(goal.id, e.target.value)}
                    className="w-16 text-xs px-1 py-0.5 border rounded text-center"
                    placeholder="+..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToGoal(goal.id, Math.abs(Number(customValue)))}
                      className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                    >
                      + OK
                    </button>
                    <button
                      onClick={() => addToGoal(goal.id, -Math.abs(Number(customValue)))}
                      className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    >
                      - OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Criar */}
      {creating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setCreating(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Nova Meta</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={createForm.descricao}
                onChange={(e) => setCreateForm({ ...createForm, descricao: e.target.value })}
                className="w-full border rounded p-2 text-sm"
                placeholder="Descrição"
              />
              <input
                type="number"
                value={createForm.valorObjetivo}
                onChange={(e) => setCreateForm({ ...createForm, valorObjetivo: Number(e.target.value) })}
                className="w-full border rounded p-2 text-sm"
                placeholder="Valor objetivo"
              />
              <input
                type="date"
                value={createForm.dataLimite}
                onChange={(e) => setCreateForm({ ...createForm, dataLimite: e.target.value })}
                className="w-full border rounded p-2 text-sm"
              />
              <button
                onClick={handleCreate}
                disabled={
                  !createForm.descricao.trim() ||
                  !createForm.dataLimite.trim() ||
                  createForm.valorObjetivo <= 0
                }
                className={`w-full py-2 rounded transition ${
                  !createForm.descricao.trim() ||
                  !createForm.dataLimite.trim() ||
                  createForm.valorObjetivo <= 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setEditing(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Editar Meta</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.descricao}
                onChange={(e) => setEditForm({ ...editForm, descricao: e.target.value })}
                className="w-full border rounded p-2 text-sm"
                placeholder="Descrição"
              />
              <input
                type="number"
                value={editForm.valorObjetivo}
                onChange={(e) => setEditForm({ ...editForm, valorObjetivo: Number(e.target.value) })}
                className="w-full border rounded p-2 text-sm"
                placeholder="Valor objetivo"
              />
              <input
                type="number"
                value={editForm.valorAtual}
                disabled
                className="w-full border rounded p-2 text-sm bg-gray-100"
                placeholder="Valor atual"
              />
              <input
                type="date"
                value={editForm.dataLimite}
                onChange={(e) => setEditForm({ ...editForm, dataLimite: e.target.value })}
                className="w-full border rounded p-2 text-sm"
              />
              <button
                onClick={handleUpdate}
                disabled={
                  !editForm.descricao.trim() ||
                  !editForm.dataLimite.trim() ||
                  editForm.valorObjetivo <= 0
                }
                className={`w-full py-2 rounded transition ${
                  !editForm.descricao.trim() ||
                  !editForm.dataLimite.trim() ||
                  editForm.valorObjetivo <= 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
