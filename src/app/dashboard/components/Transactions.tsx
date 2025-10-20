'use client';

import { useEffect, useState } from "react";
import { ArrowRight, CreditCard, X, Notebook, Trash2 } from "lucide-react";
import {
  getTransacoes,
  TransacaoResponse,
  deleteTransacao,
  updateTransacao,
  TransacaoRequest,
  getCategorias,
} from "@/http/api/dashboard/dashboardService";

export default function Transactions() {
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [allTransacoes, setAllTransacoes] = useState<TransacaoResponse[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);

  const [categorias, setCategorias] = useState<string[]>([]);
  const [editing, setEditing] = useState<TransacaoResponse | null>(null);
  const [form, setForm] = useState<TransacaoRequest>({
    valor: 0,
    descricao: "",
    tipo: "ENTRADA",
    categoriaNome: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTransacoes(5);
      setTransacoes(data);
    } catch (err) {
      setError("Erro ao carregar transações");
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
    } catch (err) {
      setError("Erro ao carregar todas as transações");
    } finally {
      setLoadingAll(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta transação?")) return;
    try {
      await deleteTransacao(id);
      setAllTransacoes((prev) => prev.filter((t) => t.id !== id));
      setTransacoes((prev) => prev.filter((t) => t.id !== id));
      window.location.reload();
    } catch (err) {
      alert("Erro ao deletar transação");
    }
  };

  const handleEdit = async (t: TransacaoResponse) => {
    setShowModal(false); // fecha "Ver tudo"
    setEditing(t);

    try {
      const cats = await getCategorias();
      setCategorias(cats);
    } catch {
      setCategorias([]);
    }

    setForm({
      descricao: t.descricao,
      valor: t.valor,
      tipo: t.valor < 0 ? "SAIDA" : "ENTRADA",
      categoriaNome: t.categoriaNome || "",
    });
  };


  const handleUpdate = async () => {
    if (!editing) return;
    try {
      const updated = await updateTransacao(editing.id, form);
      setAllTransacoes((prev) =>
        prev.map((t) => (t.id === editing.id ? updated : t))
      );
      setTransacoes((prev) =>
        prev.map((t) => (t.id === editing.id ? updated : t))
      );
      setEditing(null);
      window.location.reload();
    } catch (err) {
      alert("Erro ao atualizar transação");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow h-60 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Histórico de Transações</h2>
          <button
            onClick={openModal}
            className="flex items-center gap-2 text-purple-600 font-medium"
          >
            Ver tudo <ArrowRight size={16} />
          </button>
        </div>

        {loading && <p className="text-gray-500 text-sm">Carregando...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && !error && transacoes.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhuma transação encontrada</p>
        )}

        {!loading &&
          !error &&
          transacoes.map((t) => (
            <div
              key={t.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium">{t.descricao}</p>
                  <p className="text-xs text-gray-500">{t.hora}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p
                  className={`font-semibold ${
                    t.tipo === "SAIDA" ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {t.tipo === "SAIDA"
                    ? `-R$${Math.abs(t.valor)}`
                    : `+R$${Math.abs(t.valor)}`}
                </p>
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
          ))}
      </div>

      {/* Modal Editar */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setEditing(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Editar Transação</h2>

            <div className="space-y-3">
              <input
                type="text"
                value={form.descricao}
                onChange={(e) =>
                  setForm({ ...form, descricao: e.target.value })
                }
                className="w-full border rounded p-2 text-sm"
                placeholder="Descrição"
              />

              <input
                type="number"
                value={form.valor}
                onChange={(e) =>
                  setForm({ ...form, valor: Number(e.target.value) })
                }
                className="w-full border rounded p-2 text-sm"
                placeholder="Valor"
              />

              <select
                value={form.tipo}
                onChange={(e) =>
                  setForm({ ...form, tipo: e.target.value as "ENTRADA" | "SAIDA" })
                }
                className="w-full border rounded p-2 text-sm"
              >
                <option value="ENTRADA">Entrada</option>
                <option value="SAIDA">Saída</option>
              </select>

              <select
                value={form.categoriaNome}
                onChange={(e) =>
                  setForm({ ...form, categoriaNome: e.target.value })
                }
                className="w-full border rounded p-2 text-sm"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button
                onClick={handleUpdate}
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ver Tudo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-2/3 max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Todas as Transações</h2>

            {loadingAll && (
              <p className="text-gray-500 text-sm">Carregando transações...</p>
            )}

            {!loadingAll &&
              allTransacoes.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-medium">{t.descricao}</p>
                      <p className="text-xs text-gray-500">{t.hora}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p
                      className={`font-semibold ${
                        t.valor < 0 ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {t.valor < 0 ? `-R$${Math.abs(t.valor)}` : `+R$${t.valor}`}
                    </p>
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
              ))}
          </div>
        </div>
      )}
    </>
  );
}
