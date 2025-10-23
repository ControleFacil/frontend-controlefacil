'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import {
  TransacaoResponse,
  TransacaoRequest,
  updateTransacao,
  getCategorias,
} from '@/http/api/dashboard/dashboardService';

interface TransactionFormProps {
  editing: TransacaoResponse;
  setEditing: React.Dispatch<React.SetStateAction<TransacaoResponse | null>>;
  setAllTransacoes: React.Dispatch<React.SetStateAction<TransacaoResponse[]>>;
  setTransacoes: React.Dispatch<React.SetStateAction<TransacaoResponse[]>>;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.35, ease: 'easeOut' },
  }),
};

export default function TransactionFormEdit({
  editing,
  setEditing,
  setAllTransacoes,
  setTransacoes,
}: TransactionFormProps) {
  const [form, setForm] = useState<TransacaoRequest>({
    descricao: editing.descricao,
    valor: editing.valor,
    tipo: editing.tipo,
    categoriaNome: editing.categoriaNome || '',
  });
  const [saving, setSaving] = useState(false);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    descricao?: string;
    valor?: string;
    categoriaNome?: string;
  }>({});

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const cats = await getCategorias();
        setCategorias(cats);
      } catch {
        setCategorias([]);
      }
    };
    fetchCategorias();
  }, []);

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.descricao.trim()) errs.descricao = 'Obrigatório';
    if (!form.valor || form.valor <= 0) errs.valor = 'Deve ser maior que zero';
    if (!form.categoriaNome) errs.categoriaNome = 'Selecione uma categoria';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const updated = await updateTransacao(editing.id, form);
      setAllTransacoes((prev) =>
        prev.map((t) => (t.id === editing.id ? updated : t))
      );
      setTransacoes((prev) =>
        prev.map((t) => (t.id === editing.id ? updated : t))
      );
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-10 rounded-2xl shadow-2xl w-[480px] relative overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      >
        <button
          onClick={() => setEditing(null)}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <motion.div
          className="flex flex-col items-center mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Editar Transação</h2>
          <p className="text-gray-500 text-center text-sm mt-2 max-w-sm leading-relaxed">
            Atualize os detalhes da transação para manter seu histórico financeiro organizado.
          </p>
        </motion.div>

        {/* Formulário */}
        <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeUp}>
          {/* Descrição */}
          <motion.div className="relative" custom={1} variants={fadeUp}>
            <input
              type="text"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className={`peer w-full border-2 rounded-xl px-4 pt-6 pb-2 text-base outline-none transition-all ${
                errors.descricao
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500'
              }`}
              placeholder=" "
            />
            <label className="absolute text-gray-500 text-sm left-4 top-3 transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600">
              Descrição
            </label>
            {errors.descricao && (
              <span className="text-red-500 text-xs mt-1 block">{errors.descricao}</span>
            )}
          </motion.div>

          {/* Valor */}
          <motion.div className="relative" custom={2} variants={fadeUp}>
            <span className="absolute left-4 top-4 text-gray-500 text-sm">R$</span>
            <input
              type="number"
              value={form.valor}
              onChange={(e) =>
                setForm({ ...form, valor: e.target.value ? Number(e.target.value) : 0 })
              }
              placeholder=" "
              className={`peer w-full border-2 rounded-xl pl-10 pt-6 pb-2 text-base outline-none transition-all ${
                errors.valor
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500'
              }`}
            />
            <label className="absolute text-gray-500 text-sm left-10 top-3 transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600">
              Valor
            </label>
            {errors.valor && (
              <span className="text-red-500 text-xs mt-1 block">{errors.valor}</span>
            )}
          </motion.div>

          {/* Tipo e Categoria */}
          <motion.div className="flex gap-3" custom={3} variants={fadeUp}>
            <select
              value={form.tipo}
              onChange={(e) =>
                setForm({ ...form, tipo: e.target.value as 'ENTRADA' | 'SAIDA' })
              }
              className="w-1/2 border-2 rounded-xl p-3 text-base outline-none focus:border-purple-500 transition-all"
            >
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saída</option>
            </select>

            <select
              value={form.categoriaNome}
              onChange={(e) => setForm({ ...form, categoriaNome: e.target.value })}
              className={`w-1/2 border-2 rounded-xl p-3 text-base outline-none transition-all ${
                errors.categoriaNome
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500'
              }`}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </motion.div>

          {/* Botão */}
          <motion.button
            onClick={onSubmit}
            disabled={saving}
            whileHover={!saving ? { scale: 1.03 } : {}}
            whileTap={!saving ? { scale: 0.97 } : {}}
            className={`w-full py-3.5 rounded-xl font-medium transition-all shadow-lg ${
              saving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {saving ? 'Salvando...' : 'Atualizar Transação'}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
