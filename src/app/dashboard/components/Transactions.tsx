'use client';

import { useEffect, useState } from "react";
import { ArrowRight, CreditCard, X } from "lucide-react";
import { getTransacoes, TransacaoResponse } from "@/http/api/dashboard/dashboardService";

export default function Transactions() {
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [allTransacoes, setAllTransacoes] = useState<TransacaoResponse[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransacoes(5); // últimas 5
        setTransacoes(data);
      } catch (err) {
        setError("Erro ao carregar transações");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <p
                className={`font-semibold ${
                  t.valor < 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                {t.valor < 0 ? `-R$${Math.abs(t.valor)}` : `+R$${t.valor}`}
              </p>
            </div>
          ))}
      </div>

      {/* Modal */}
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
                  <p
                    className={`font-semibold ${
                      t.valor < 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {t.valor < 0 ? `-R$${Math.abs(t.valor)}` : `+R$${t.valor}`}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
