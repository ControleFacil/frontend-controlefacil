"use client";

import { useState, useEffect } from "react";
import { Bell, User, Plus } from "lucide-react";
import { createTransacao, getCategorias } from "@/http/api/dashboard/dashboardService";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<"ENTRADA" | "SAIDA">("ENTRADA");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaNome, setCategoriaNome] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      getCategorias()
        .then((res) => setCategorias(res))
        .catch((err) => console.error("Erro ao carregar categorias:", err));
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTransacao({
        valor: parseFloat(valor),
        descricao,
        tipo,
        categoriaNome,
      });
      setOpen(false);
      setValor("");
      setDescricao("");
      setCategoriaNome("");
      setTipo("ENTRADA");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
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
            <Plus className="w-4 h-4" /> Adicionar
          </button>

          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-140 p-6">
            <h2 className="text-lg font-semibold mb-4">Adicionar Transação</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as "ENTRADA" | "SAIDA")}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="ENTRADA">Entrada</option>
                  <option value="SAIDA">Saída</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Valor</label>
                  <input
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="0,00"
                    required
                    className="w-full border rounded-lg p-2"
                  />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Ex: Conta de luz"
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <select
                  value={categoriaNome}
                  onChange={(e) => setCategoriaNome(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
