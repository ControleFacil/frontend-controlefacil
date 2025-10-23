'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GoalFormEditProps {
  editForm: { descricao: string; valorObjetivo: number | null; valorAtual: number | null; dataLimite: string };
  setEditForm: Dispatch<
    SetStateAction<{ descricao: string; valorObjetivo: number | null; valorAtual: number | null; dataLimite: string }>
  >;
  handleUpdate: () => Promise<void>;
  setEditing: Dispatch<SetStateAction<any>>;
}

export default function GoalFormEdit({
  editForm,
  setEditForm,
  handleUpdate,
  setEditing,
}: GoalFormEditProps) {
  const [errors, setErrors] = useState<{ descricao?: string; valorObjetivo?: string; dataLimite?: string }>({});
  const [saving, setSaving] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'valorObjetivo' | 'valorAtual' | null>(null);

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!editForm.descricao?.trim()) errs.descricao = 'Obrigatório';
    if (!editForm.valorObjetivo || editForm.valorObjetivo <= 0)
      errs.valorObjetivo = 'Deve ser maior que zero';
    if (editForm.valorAtual && editForm.valorObjetivo && editForm.valorObjetivo < editForm.valorAtual)
      errs.valorObjetivo = 'Não pode ser menor que o valor atual';
    if (!editForm.dataLimite) errs.dataLimite = 'Obrigatório';
    else if (new Date(editForm.dataLimite) < new Date()) errs.dataLimite = 'Deve ser no futuro';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await handleUpdate();
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 10, 11, 31);
    if (date > maxDate) date.setFullYear(maxDate.getFullYear(), 11, 31);
    setEditForm({ ...editForm, dataLimite: date.toISOString().split('T')[0] });
  };

  const prefixVariants = {
    focused: { x: -2, y: -2, scale: 1.1, color: '#6B21A8' },
    unfocused: { x: 0, y: 0, scale: 1, color: '#6B21A8' },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] p-6 sm:p-8 relative overflow-y-auto max-h-[90vh] flex flex-col"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        {/* Botão fechar */}
        <button
          onClick={() => setEditing(null)}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={24} />
        </button>

        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-8 space-y-3">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md p-4">
            <Image src="/assets/cfLogo.png" alt="Logo ControleFácil" width={80} height={80} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 text-center">
            Editar Meta Financeira
          </h1>
          <p className="text-gray-500 text-center max-w-[400px] text-sm sm:text-base">
            Atualize seus objetivos financeiros e mantenha seu progresso sob controle.
          </p>
        </div>

        {/* Formulário */}
        <div className="space-y-6 flex-1 overflow-y-auto">
          {/* Descrição */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Descrição da Meta</label>
            <motion.input
              type="text"
              value={editForm.descricao || ''}
              onChange={(e) => setEditForm({ ...editForm, descricao: e.target.value })}
              placeholder="Ex: Comprar um carro"
              className={`w-full border rounded-xl p-4 text-lg transition-all duration-200 focus:ring-2 focus:ring-purple-500 ${
                errors.descricao ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              whileFocus={{ scale: 1.02 }}
            />
            {errors.descricao && (
              <span className="text-red-500 text-sm mt-1">{errors.descricao}</span>
            )}
          </div>

          {/* Valor Objetivo */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Valor Objetivo</label>
            <div className="relative">
              <motion.span
                className="absolute left-4 top-1/2 -translate-y-1/2 font-medium"
                variants={prefixVariants}
                animate={focusedInput === 'valorObjetivo' ? 'focused' : 'unfocused'}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                R$
              </motion.span>
              <motion.input
                type="number"
                value={editForm.valorObjetivo ?? ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    valorObjetivo: e.target.value ? Number(e.target.value) : null,
                  })
                }
                placeholder="0,00"
                className={`w-full border rounded-xl p-4 pl-10 text-lg transition-all duration-200 focus:ring-2 focus:ring-purple-500 ${
                  errors.valorObjetivo ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                onFocus={() => setFocusedInput('valorObjetivo')}
                onBlur={() => setFocusedInput(null)}
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            {errors.valorObjetivo && (
              <span className="text-red-500 text-sm mt-1">{errors.valorObjetivo}</span>
            )}
          </div>

          {/* Valor Atual */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Valor Atual</label>
            <div className="relative">
              <motion.span
                className="absolute left-4 top-1/2 -translate-y-1/2 font-medium"
                variants={prefixVariants}
                animate={focusedInput === 'valorAtual' ? 'focused' : 'unfocused'}
              >
                R$
              </motion.span>
              <input
                type="number"
                value={editForm.valorAtual ?? ''}
                disabled
                className="w-full border rounded-xl p-4 pl-10 text-lg bg-gray-100 cursor-not-allowed"
                placeholder="0,00"
              />
            </div>
          </div>

          {/* Data Limite */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Data Limite</label>
            <DatePicker
              selected={editForm.dataLimite ? new Date(editForm.dataLimite) : null}
              onChange={handleDateChange}
              className={`w-full border rounded-xl p-4 text-lg transition-all duration-200 focus:ring-2 focus:ring-purple-500 ${
                errors.dataLimite ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              maxDate={new Date(new Date().getFullYear() + 10, 11, 31)}
              placeholderText="Selecione a data limite"
            />
            {errors.dataLimite && (
              <span className="text-red-500 text-sm mt-1">{errors.dataLimite}</span>
            )}
          </div>

          {/* Botão */}
          <motion.button
            onClick={onSubmit}
            disabled={saving}
            className={`w-full py-4 rounded-xl text-lg font-semibold text-white transition-all duration-200 ${
              saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
            }`}
            whileHover={{ scale: saving ? 1 : 1.02 }}
            whileTap={{ scale: saving ? 1 : 0.98 }}
          >
            {saving ? 'Atualizando...' : 'Atualizar Meta'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
