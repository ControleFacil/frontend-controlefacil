'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface GoalFormProps {
  createForm: { descricao: string; valorObjetivo: number | null; dataLimite: string };
  setCreateForm: React.Dispatch<
    React.SetStateAction<{ descricao: string; valorObjetivo: number | null; dataLimite: string }>
  >;
  handleCreate: () => Promise<void>;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: 'easeOut' },
  }),
};

export default function GoalFormCreate({
  createForm,
  setCreateForm,
  handleCreate,
  setCreating,
}: GoalFormProps) {
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ descricao?: string; valorObjetivo?: string; dataLimite?: string }>({});

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!createForm.descricao.trim()) errs.descricao = 'Obrigatório';
    if (createForm.valorObjetivo === null || createForm.valorObjetivo <= 0)
      errs.valorObjetivo = 'Deve ser maior que zero';
    if (!createForm.dataLimite) errs.dataLimite = 'Obrigatório';
    else if (new Date(createForm.dataLimite) < new Date()) errs.dataLimite = 'Deve ser no futuro';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await handleCreate();
    } finally {
      setSaving(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 10, 11, 31);
    if (date > maxDate) date.setFullYear(maxDate.getFullYear(), 11, 31);
    setCreateForm({ ...createForm, dataLimite: date.toISOString().split('T')[0] });
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
          onClick={() => setCreating(false)}
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
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">Criar Nova Meta</h2>
          <p className="text-gray-500 text-center text-sm mt-2 max-w-sm leading-relaxed">
            Defina um objetivo financeiro claro e acompanhe seu progresso de forma organizada e
            intuitiva.
          </p>
        </motion.div>

        {/* Inputs */}
        <motion.div
          className="space-y-7"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Descrição */}
          <motion.div className="relative" custom={1} variants={fadeUp}>
            <input
              type="text"
              value={createForm.descricao}
              onChange={(e) => setCreateForm({ ...createForm, descricao: e.target.value })}
              className={`peer w-full border-2 rounded-xl px-4 pt-6 pb-2 text-base outline-none transition-all ${
                errors.descricao
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500'
              }`}
              placeholder=" "
            />
            <label
              className="absolute text-gray-500 text-sm left-4 top-3 transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600"
            >
              Descrição da meta
            </label>
            {errors.descricao && (
              <span className="text-red-500 text-xs mt-1 block">{errors.descricao}</span>
            )}
          </motion.div>

          {/* Valor objetivo */}
          <motion.div className="relative" custom={2} variants={fadeUp}>
            <span
              className={`absolute left-4 top-4 text-gray-500 text-sm transition-all ${
                errors.valorObjetivo ? 'text-red-500' : 'peer-focus:text-purple-600'
              }`}
            >
              R$
            </span>
            <input
              type="number"
              value={createForm.valorObjetivo ?? ''}
              onChange={(e) =>
                setCreateForm({
                  ...createForm,
                  valorObjetivo: e.target.value ? Number(e.target.value) : null,
                })
              }
              placeholder=" "
              className={`peer w-full border-2 rounded-xl pl-10 pt-6 pb-2 text-base outline-none transition-all ${
                errors.valorObjetivo
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500'
              }`}
            />
            <label
              className="absolute text-gray-500 text-sm left-10 top-3 transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600"
            >
              Valor objetivo
            </label>
            {errors.valorObjetivo && (
              <span className="text-red-500 text-xs mt-1 block">{errors.valorObjetivo}</span>
            )}
          </motion.div>

          {/* Data limite */}
          <motion.div className="relative" custom={3} variants={fadeUp}>
            <DatePicker
              selected={createForm.dataLimite ? new Date(createForm.dataLimite) : null}
              onChange={handleDateChange}
              className={`peer w-full border-2 rounded-xl px-4 pt-6 pb-2 text-base outline-none transition-all ${
                errors.dataLimite
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500'
              }`}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              maxDate={new Date(new Date().getFullYear() + 10, 11, 31)}
              placeholderText="Selecione a data limite"
            />
            <label
              className="absolute text-gray-500 text-sm left-4 top-3 transition-all
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600"
            >
              Data limite
            </label>
            {errors.dataLimite && (
              <span className="text-red-500 text-xs mt-1 block">{errors.dataLimite}</span>
            )}
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
            {saving ? 'Salvando...' : 'Salvar Meta'}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
