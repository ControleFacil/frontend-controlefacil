'use client';

import { useEffect, useState, useMemo } from 'react';
import { X, CreditCard, Trash2, Notebook, Filter } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import {
  getTransacoes,
  deleteTransacao,
  getCategorias,
  TransacaoResponse,
} from '@/http/api/dashboard/dashboardService';
import TransactionFormEdit from './TransactionForm';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export default function Transactions() {
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  const [allTransacoes, setAllTransacoes] = useState<TransacaoResponse[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TransacaoResponse | null>(null);

  // filtros
  const [filtroTipo, setFiltroTipo] = useState<string>('TODOS');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('TODAS');
  const [ordemAlfabetica, setOrdemAlfabetica] = useState<'ASC' | 'DESC'>('ASC');

  useEffect(() => {
    fetchData();
    getCategorias()
      .then(setCategorias)
      .catch(() => console.error('Erro ao carregar categorias'));
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTransacoes(100);
      setTransacoes(data);
      setAllTransacoes(data);
    } catch {
      setError('Erro ao carregar transações');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) return;
    try {
      await deleteTransacao(id);
      setTransacoes(prev => prev.filter(t => t.id !== id));
      setAllTransacoes(prev => prev.filter(t => t.id !== id));
    } catch {
      alert('Erro ao deletar transação');
    }
  };

  const handleEdit = (t: TransacaoResponse) => setEditing(t);

  // 🔎 Aplicar filtros e ordenação no front
  const transacoesFiltradas = useMemo(() => {
    let filtradas = [...allTransacoes];

    if (filtroTipo !== 'TODOS') {
      filtradas = filtradas.filter(t => t.tipo === filtroTipo);
    }

    if (filtroCategoria !== 'TODAS') {
      filtradas = filtradas.filter(t => t.categoriaNome === filtroCategoria);
    }

    filtradas.sort((a, b) => {
      const descA = a.descricao.toLowerCase();
      const descB = b.descricao.toLowerCase();
      return ordemAlfabetica === 'ASC'
        ? descA.localeCompare(descB)
        : descB.localeCompare(descA);
    });

    return filtradas;
  }, [allTransacoes, filtroTipo, filtroCategoria, ordemAlfabetica]);

  const TransactionCard = ({ t, index }: { t: TransacaoResponse; index: number }) => (
    <motion.div
      key={t.id}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={index}
      className="flex justify-between items-start border-b py-4 hover:bg-gray-50 transition rounded-lg px-3"
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${t.tipo === 'SAIDA' ? 'bg-red-100' : 'bg-green-100'}`}>
          <CreditCard className={`w-6 h-6 ${t.tipo === 'SAIDA' ? 'text-red-600' : 'text-green-600'}`} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{t.descricao}</p>
          <p className="text-xs text-gray-500">{t.hora}</p>
          {t.categoriaNome && (
            <span className="inline-block mt-1 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
              {t.categoriaNome}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className={`font-bold text-lg ${t.tipo === 'SAIDA' ? 'text-red-500' : 'text-green-600'}`}>
          {t.tipo === 'SAIDA' ? `-R$${Math.abs(t.valor)}` : `+R$${Math.abs(t.valor)}`}
        </p>
        <div className="flex gap-2">
          <Notebook
            className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={() => handleEdit(t)}
          />
          <Trash2
            className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => handleDelete(t.id)}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Cabeçalho e filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Filter className="w-6 h-6 text-purple-600" />
          Transações
        </h2>

        <div className="flex flex-wrap gap-3">
          {/* Tipo */}
          <select
            value={filtroTipo}
            onChange={e => setFiltroTipo(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="TODOS">Todos os tipos</option>
            <option value="SAIDA">Saídas</option>
            <option value="ENTRADA">Entradas</option>
          </select>

          {/* Categoria */}
          <select
            value={filtroCategoria}
            onChange={e => setFiltroCategoria(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="TODAS">Todas as categorias</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Ordem */}
          <select
            value={ordemAlfabetica}
            onChange={e => setOrdemAlfabetica(e.target.value as 'ASC' | 'DESC')}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="ASC">A → Z</option>
            <option value="DESC">Z → A</option>
          </select>
        </div>
      </div>

      {/* Lista */}
      {loading && <p className="text-gray-500 text-sm">Carregando...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!loading && !error && transacoesFiltradas.length === 0 && (
        <p className="text-gray-500 text-sm">Nenhuma transação encontrada</p>
      )}

      <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
        {transacoesFiltradas.map((t, i) => (
          <TransactionCard key={t.id} t={t} index={i} />
        ))}
      </div>

      {editing && (
        <TransactionFormEdit
          editing={editing}
          setEditing={setEditing}
          setTransacoes={setTransacoes}
          setAllTransacoes={setAllTransacoes}
        />
      )}
    </div>
  );
}
