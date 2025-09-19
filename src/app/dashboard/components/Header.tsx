"use client";

import { useState } from "react";
import { Bell, User, Plus } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

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

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select className="w-full border rounded-lg p-2">
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Valor</label>
                <input
                  type="number"
                  placeholder="0,00"
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  placeholder="Ex: Conta de luz"
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Categoria
                </label>
                <input
                  type="text"
                  placeholder="Ex: Casa, Lazer, Mercado"
                  className="w-full border rounded-lg p-2"
                />
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
