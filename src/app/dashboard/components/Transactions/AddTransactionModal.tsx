"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { createTransacao, getCategorias } from "@/http/api/dashboard/dashboardService";

interface Props {
  setOpen: (value: boolean) => void;
}

export default function AddTransactionModal({ setOpen }: Props) {
  const [tipo, setTipo] = useState<"ENTRADA" | "SAIDA">("ENTRADA");
  const [valor, setValor] = useState<number | null>(null);
  const [descricao, setDescricao] = useState("");
  const [categoriaNome, setCategoriaNome] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ valor?: string; descricao?: string; categoriaNome?: string }>({});

  useEffect(() => {
    getCategorias().then(setCategorias).catch(() => setCategorias([]));
  }, []);

  const validate = () => {
    const errs: typeof errors = {};
    if (!valor || valor <= 0) errs.valor = "O valor deve ser maior que zero";
    if (!descricao.trim()) errs.descricao = "A descrição é obrigatória";
    if (!categoriaNome) errs.categoriaNome = "Selecione uma categoria";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await createTransacao({ valor: Number(valor), descricao, tipo, categoriaNome });
      setOpen(false);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-8 space-y-3">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md p-4">
            <Image src="/assets/cfLogo.png" alt="Logo" width={80} height={80} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 text-center">Adicionar Transação</h1>
          <p className="text-gray-500 text-center max-w-[400px] text-sm sm:text-base">
            Registre suas entradas e saídas com segurança e mantenha seu controle financeiro em dia.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "ENTRADA" | "SAIDA")}
              className="w-full border rounded-xl p-3 text-base focus:ring-2 focus:ring-purple-500 border-gray-300"
            >
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saída</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Valor</label>
            <input
              type="number"
              step="0.01"
              value={valor ?? ""}
              onChange={(e) => setValor(Number(e.target.value))}
              placeholder="0,00"
              className={`w-full border rounded-xl p-3 text-base focus:ring-2 focus:ring-purple-500 ${
                errors.valor ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.valor && <span className="text-red-500 text-sm">{errors.valor}</span>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Conta de luz"
              className={`w-full border rounded-xl p-3 text-base focus:ring-2 focus:ring-purple-500 ${
                errors.descricao ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao}</span>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Categoria</label>
            <select
              value={categoriaNome}
              onChange={(e) => setCategoriaNome(e.target.value)}
              className={`w-full border rounded-xl p-3 text-base focus:ring-2 focus:ring-purple-500 ${
                errors.categoriaNome ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.categoriaNome && (
              <span className="text-red-500 text-sm">{errors.categoriaNome}</span>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl border hover:bg-gray-100 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-xl font-semibold text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Salvando..." : "Salvar Transação"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
