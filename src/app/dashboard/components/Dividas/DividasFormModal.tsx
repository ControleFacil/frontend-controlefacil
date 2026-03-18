"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

import {
  Divida,
  DividaRequest,
  createDivida,
  updateDivida
} from "@/http/api/dashboard/dashboardService";

interface Props {
  open: boolean;
  onClose: () => void;
  divida: Divida | null;
  reload: () => void;
}

export default function DividaFormModal({ open, onClose, divida, reload }: Props) {

  const emptyForm: DividaRequest = {
    nomeCredor: "",
    categoria: "",
    tipo: "FIXA",
    valorTotal: 0,
    quantidadeParcelas: null,
    dataPrimeiroVencimento: "",
    diaVencimento: null,
    observacoes: ""
  };

  const [form, setForm] = useState<DividaRequest>(emptyForm);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    nomeCredor?: string;
    valorTotal?: string;
    categoria?: string;
  }>({});

  useEffect(() => {
    if (divida) {
      setForm({
        nomeCredor: divida.nomeCredor,
        categoria: divida.categoria,
        tipo: divida.tipo,
        valorTotal: divida.valorTotal,
        quantidadeParcelas: divida.quantidadeParcelas,
        dataPrimeiroVencimento: divida.dataPrimeiroVencimento,
        diaVencimento: divida.diaVencimento,
        observacoes: divida.observacoes ?? ""
      });
    } else {
      setForm(emptyForm);
    }
  }, [divida]);

  const validate = () => {
    const errs: typeof errors = {};

    if (!form.nomeCredor.trim()) errs.nomeCredor = "Informe o credor";
    if (!form.categoria.trim()) errs.categoria = "Informe uma categoria";
    if (!form.valorTotal || form.valorTotal <= 0)
      errs.valorTotal = "O valor deve ser maior que zero";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const payload: DividaRequest = {
      ...form,
      quantidadeParcelas:
        form.tipo === "PARCELADA" ? form.quantidadeParcelas : null
    };

    try {
      if (divida) {
        await updateDivida(divida.id, payload);
      } else {
        await createDivida(payload);
      }

      reload();
      onClose();
    } catch {
      alert("Erro ao salvar dívida");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
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
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-8 space-y-3">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md p-4">
            <Image src="/assets/cfLogo.png" alt="Logo" width={80} height={80} />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-800 text-center">
            {divida ? "Editar Dívida" : "Adicionar Dívida"}
          </h1>

          <p className="text-gray-500 text-center max-w-[400px] text-sm sm:text-base">
            Registre suas dívidas e acompanhe parcelas e vencimentos para manter seu controle financeiro em dia.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Credor</label>
            <input
              value={form.nomeCredor}
              onChange={(e) =>
                setForm({ ...form, nomeCredor: e.target.value })
              }
              className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-500 ${
                errors.nomeCredor ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.nomeCredor && (
              <span className="text-red-500 text-sm">{errors.nomeCredor}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Categoria</label>
            <input
              value={form.categoria}
              onChange={(e) =>
                setForm({ ...form, categoria: e.target.value })
              }
              className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-500 ${
                errors.categoria ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.categoria && (
              <span className="text-red-500 text-sm">{errors.categoria}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Tipo</label>
            <select
              value={form.tipo}
              onChange={(e) =>
                setForm({
                  ...form,
                  tipo: e.target.value as "FIXA" | "PARCELADA" | "RECORRENTE"
                })
              }
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-500 border-gray-300"
            >
              <option value="FIXA">Dívida única</option>
              <option value="PARCELADA">Parcelada</option>
              <option value="RECORRENTE">Recorrente</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Valor total</label>
            <input
              type="number"
              step="0.01"
              value={form.valorTotal}
              onChange={(e) =>
                setForm({ ...form, valorTotal: Number(e.target.value) })
              }
              className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-500 ${
                errors.valorTotal ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.valorTotal && (
              <span className="text-red-500 text-sm">{errors.valorTotal}</span>
            )}
          </div>

          {form.tipo === "PARCELADA" && (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Quantidade de parcelas
              </label>
              <input
                type="number"
                value={form.quantidadeParcelas ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantidadeParcelas:
                      e.target.value === "" ? null : Number(e.target.value)
                  })
                }
                className="w-full border rounded-xl p-3 border-gray-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Primeiro vencimento
            </label>
            <input
              type="date"
              value={form.dataPrimeiroVencimento}
              onChange={(e) =>
                setForm({ ...form, dataPrimeiroVencimento: e.target.value })
              }
              className="w-full border rounded-xl p-3 border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Observações
            </label>
            <textarea
              value={form.observacoes}
              onChange={(e) =>
                setForm({ ...form, observacoes: e.target.value })
              }
              className="w-full border rounded-xl p-3 border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-xl border hover:bg-gray-100 font-medium"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-xl font-semibold text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Salvando..." : "Salvar Dívida"}
            </button>
          </div>

        </form>
      </motion.div>
    </motion.div>
  );
}