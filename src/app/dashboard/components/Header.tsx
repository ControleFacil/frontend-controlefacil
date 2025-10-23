"use client";

import { useState, useEffect } from "react";
import { Bell, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { createTransacao, getCategorias } from "@/http/api/dashboard/dashboardService";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<"ENTRADA" | "SAIDA">("ENTRADA");
  const [valor, setValor] = useState<number | null>(null);
  const [descricao, setDescricao] = useState("");
  const [categoriaNome, setCategoriaNome] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ valor?: string; descricao?: string; categoriaNome?: string }>({});
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (open) {
      getCategorias()
        .then((res) => setCategorias(res))
        .catch(() => console.error("Erro ao carregar categorias"));
    }
  }, [open]);

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
      await createTransacao({
        valor: Number(valor),
        descricao: descricao.trim(),
        tipo,
        categoriaNome,
      });

      setOpen(false);
      setValor(null);
      setDescricao("");
      setCategoriaNome("");
      setTipo("ENTRADA");
      setErrors({});
      window.location.reload();
    } catch (err) {
      console.error("Erro ao criar transação:", err);
      alert("Não foi possível adicionar a transação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const prefixVariants = {
    focused: { x: -2, y: -2, scale: 1.1, color: "#6B21A8" },
    unfocused: { x: 0, y: 0, scale: 1, color: "#6B21A8" },
  };

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-black">Dashboard</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            <Plus className="w-4 h-4" /> Adicionar Transação
          </button>

          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </header>

      {open && (
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
            transition={{ type: "spring", stiffness: 120 }}
          >
            {/* Botão fechar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>

            {/* Cabeçalho */}
            <div className="flex flex-col items-center mb-8 space-y-3">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md p-4">
                <Image src="/assets/cfLogo.png" alt="Logo ControleFácil" width={80} height={80} />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800 text-center">Adicionar Transação</h1>
              <p className="text-gray-500 text-center max-w-[400px] text-sm sm:text-base">
                Registre suas entradas e saídas com segurança e mantenha seu controle financeiro em dia.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto">
              {/* Tipo */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">Tipo</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as "ENTRADA" | "SAIDA")}
                  className="w-full border rounded-xl p-4 text-lg focus:ring-2 focus:ring-purple-500 border-gray-300"
                >
                  <option value="ENTRADA">Entrada</option>
                  <option value="SAIDA">Saída</option>
                </select>
              </div>

              {/* Valor */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">Valor</label>
                <div className="relative">
                  <motion.span
                    className="absolute left-4 top-1/2 -translate-y-1/2 font-medium"
                    variants={prefixVariants}
                    animate={focused ? "focused" : "unfocused"}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    R$
                  </motion.span>
                  <motion.input
                    type="number"
                    step="0.01"
                    value={valor ?? ""}
                    onChange={(e) => setValor(Number(e.target.value))}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="0,00"
                    className={`w-full border rounded-xl p-4 pl-10 text-lg transition-all duration-200 focus:ring-2 focus:ring-purple-500 ${
                      errors.valor ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                {errors.valor && <span className="text-red-500 text-sm mt-1">{errors.valor}</span>}
              </div>

              {/* Descrição */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">Descrição</label>
                <motion.input
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Ex: Conta de luz"
                  className={`w-full border rounded-xl p-4 text-lg transition-all duration-200 focus:ring-2 focus:ring-purple-500 ${
                    errors.descricao ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.descricao && <span className="text-red-500 text-sm mt-1">{errors.descricao}</span>}
              </div>

              {/* Categoria */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">Categoria</label>
                <select
                  value={categoriaNome}
                  onChange={(e) => setCategoriaNome(e.target.value)}
                  className={`w-full border rounded-xl p-4 text-lg focus:ring-2 focus:ring-purple-500 ${
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
                  <span className="text-red-500 text-sm mt-1">{errors.categoriaNome}</span>
                )}
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl border hover:bg-gray-100 font-medium"
                >
                  Cancelar
                </button>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-xl text-lg font-semibold text-white transition-all duration-200 ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                  }`}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? "Salvando..." : "Salvar Transação"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
