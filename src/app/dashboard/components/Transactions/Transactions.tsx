'use client';

import { useEffect, useState } from 'react';
import { X, CreditCard, Trash2, Notebook } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import {
  getTransacoes,
  TransacaoResponse,
  deleteTransacao,
  getCategorias,
} from '@/http/api/dashboard/dashboardService';
import TransactionFormEdit from './TransactionForm'; // importar o formulário de edição

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
  const [loading, setLoading] = useState(true);
  const [loadingAll, setLoadingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TransacaoResponse | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTransacoes(5);
      setTransacoes(data);
    } catch {
      setError('Erro ao carregar transações');
    } finally {
      setLoading(false);
    }
  };

  const openModal = async () => {
    setShowModal(true);
    setLoadingAll(true);
    try {
      const data = await getTransacoes(100);
      setAllTransacoes(data);
    } catch {
      setError('Erro ao carregar todas as transações');
    } finally {
      setLoadingAll(false);
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

  const handleEdit = (t: TransacaoResponse) => {
    setEditing(t);
  };

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
        <div className="bg-purple-100 p-2 rounded-lg">
          <CreditCard className="w-6 h-6 text-purple-600" />
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
    <>
      <div className="bg-white p-6 rounded-xl shadow h-72 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Histórico de Transações</h2>
          <button
            onClick={openModal}
            className="flex items-center gap-2 text-purple-600 font-medium"
          >
            Ver tudo
          </button>
        </div>

        {loading && <p className="text-gray-500 text-sm">Carregando...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && !error && transacoes.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhuma transação encontrada</p>
        )}
        {!loading && !error && transacoes.map((t, i) => <TransactionCard key={t.id} t={t} index={i} />)}
      </div>

      {/* Modal Ver Tudo */}
      {showModal && (
        <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div className="bg-white rounded-2xl shadow-xl w-3/4 max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Todas as Transações</h2>
            {loadingAll && <p className="text-gray-500 text-sm">Carregando...</p>}
            {!loadingAll &&
              allTransacoes.map((t, i) => <TransactionCard key={t.id} t={t} index={i} />)}
          </motion.div>
        </motion.div>
      )}

      {/* Modal Editar */}
      {editing && (
        <TransactionFormEdit
          editing={editing}
          setEditing={setEditing}
          setTransacoes={setTransacoes}
          setAllTransacoes={setAllTransacoes}
        />
      )}
    </>
  );
}
