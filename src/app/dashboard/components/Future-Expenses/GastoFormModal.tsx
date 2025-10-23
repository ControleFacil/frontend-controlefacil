'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GastoFuturoResponse } from '@/http/api/dashboard/dashboardService';

interface GastoFormModalProps {
  editing?: { id: string; descricao: string; valor: number; data: string } | null;
  onClose: () => void;
  onSave: () => void;
  createGastoFuturo: (body: { descricao: string; valor: number; data: string }) => Promise<void>;
  updateGastoFuturo: (id: string, body: { descricao: string; valor: number; data: string }) => Promise<GastoFuturoResponse>;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: 'easeOut' },
  }),
};

export default function GastoFormModal({
  editing,
  onClose,
  onSave,
  createGastoFuturo,
  updateGastoFuturo,
}: GastoFormModalProps) {
  const [descricao, setDescricao] = useState(editing?.descricao || '');
  const [valor, setValor] = useState(editing ? String(editing.valor) : '');
  const [data, setData] = useState(editing ? new Date(editing.data) : new Date());
  const [errors, setErrors] = useState<{ descricao?: string; valor?: string; data?: string }>({});
  const [saving, setSaving] = useState(false);

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!descricao.trim()) errs.descricao = 'Descrição obrigatória';
    if (!valor || parseFloat(valor) <= 0) errs.valor = 'Valor deve ser maior que zero';
    if (!data || data < new Date(new Date().setHours(0,0,0,0))) errs.data = 'A data deve ser futura';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);

    const body = {
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      data: data.toISOString().split('T')[0],
    };

    try {
      if (editing) await updateGastoFuturo(editing.id, body);
      else await createGastoFuturo(body);
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar gasto futuro.');
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
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={24} />
        </button>

        {/* Logo e título */}
        <motion.div
          className="flex flex-col items-center mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Image src="/assets/cfLogo.png" alt="Logo" width={85} height={85} className="mb-3" />
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
            {editing ? 'Editar Gasto Futuro' : 'Adicionar Gasto Futuro'}
          </h2>
          <p className="text-gray-500 text-center text-sm mt-2 max-w-sm leading-relaxed">
            Registre um gasto futuro e organize seu planejamento financeiro de forma intuitiva.
          </p>
        </motion.div>

        {/* Inputs */}
        <motion.div className="space-y-7" initial="hidden" animate="visible" variants={fadeUp}>
          {/* Descrição */}
          <motion.div className="relative" custom={1} variants={fadeUp}>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder=" "
              className={`peer w-full border-2 rounded-xl px-4 pt-6 pb-2 text-base outline-none transition-all ${
                errors.descricao ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-purple-500'
              }`}
            />
            <label
              className="absolute text-gray-500 text-sm left-4 top-3 transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600"
            >
              Descrição
            </label>
            {errors.descricao && <span className="text-red-500 text-xs mt-1 block">{errors.descricao}</span>}
          </motion.div>

          {/* Valor */}
          <motion.div className="relative" custom={2} variants={fadeUp}>
            <span
              className={`absolute left-4 top-4 text-gray-500 text-sm transition-all ${
                errors.valor ? 'text-red-500' : 'peer-focus:text-purple-600'
              }`}
            >
              R$
            </span>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder=" "
              className={`peer w-full border-2 rounded-xl pl-10 pt-6 pb-2 text-base outline-none transition-all ${
                errors.valor ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-purple-500'
              }`}
            />
            <label
              className="absolute text-gray-500 text-sm left-10 top-3 transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600"
            >
              Valor
            </label>
            {errors.valor && <span className="text-red-500 text-xs mt-1 block">{errors.valor}</span>}
          </motion.div>

          {/* Data */}
          <motion.div className="relative" custom={3} variants={fadeUp}>
            <DatePicker
              selected={data}
              onChange={(d: Date | null) => d && setData(d)}
              className={`peer w-full border-2 rounded-xl px-4 pt-6 pb-2 text-base outline-none transition-all ${
                errors.data ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-purple-500'
              }`}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
            <label
              className="absolute text-gray-500 text-sm left-4 top-3 transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600"
            >
              Data
            </label>
            {errors.data && <span className="text-red-500 text-xs mt-1 block">{errors.data}</span>}
          </motion.div>

          {/* Botão */}
          <motion.button
            onClick={handleSubmit}
            disabled={saving}
            whileHover={!saving ? { scale: 1.03 } : {}}
            whileTap={!saving ? { scale: 0.97 } : {}}
            className={`w-full py-3.5 rounded-xl font-medium transition-all shadow-lg ${
              saving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {saving ? 'Salvando...' : 'Salvar Gasto Futuro'}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
