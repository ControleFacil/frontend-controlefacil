"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Check } from "lucide-react";

export default function PlanPage() {
  const [planos, setPlanos] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/api/plano")
      .then((r) => setPlanos(r.data))
      .catch((err) => console.error("Erro ao buscar planos:", err));
  }, []);

  const handleNext = async () => {
    if (!selected) {
      alert("Selecione um plano antes de continuar.");
      return;
    }

    setLoading(true);

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        alert("Sessão expirada. Faça login novamente.");
        router.push("/auth/login");
        return;
      }

      router.push(`/auth/register/payment/${selected}`);
    } catch (error) {
      console.error("Erro ao processar plano:", error);
      alert("Erro ao processar plano. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-['Noto_Sans'] bg-white px-6">
      <div className="w-full max-w-5xl mb-10">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
          💜 Controle Fácil
        </h1>
        <p className="text-sm text-gray-600 mt-1">Passo 2 de 3</p>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Escolha o melhor plano para você
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {planos.map((plano) => (
          <div
            key={plano.id}
            onClick={() => setSelected(plano.id)}
            className={`relative border rounded-2xl shadow-lg transition-all cursor-pointer p-6 hover:shadow-[-8px_8px_12px_rgba(168,85,247,0.4)] ${
              selected === plano.id
                ? "border-purple-500 shadow-[-8px_8px_12px_rgba(168,85,247,0.5)]"
                : "border-gray-200"
            }`}
          >
            <div
              className={`rounded-xl p-3 text-center text-white font-semibold mb-4 ${
                selected === plano.id
                  ? "bg-gradient-to-r from-purple-500 to-purple-700"
                  : "bg-gradient-to-r from-purple-300 to-purple-400"
              }`}
            >
              {plano.nome.charAt(0).toUpperCase() +
                plano.nome.slice(1).toLowerCase()}
            </div>

            <ul className="text-gray-600 space-y-2 text-sm">
              <li>💰 R$ {plano.precoMensal.toFixed(2)}/mês</li>
              <li>🗒️ Acesso Bot Whatsapp</li>
              <li>🔁 {plano.limiteTransacoes} transações/mês</li>
              <li>
                {plano.suportePrioritario
                  ? "⚡ Suporte prioritário"
                  : "❌ Sem suporte prioritário"}
              </li>
            </ul>

            {selected === plano.id && (
              <div className="absolute top-4 right-4 bg-purple-600 text-white rounded-full p-1 shadow-md">
                <Check size={18} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-5xl text-center mt-10">
        <p className="text-xs text-gray-500 mb-6">Informações importantes</p>

        <button
          onClick={handleNext}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium px-10 py-3 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Carregando..." : "Próximo"}
        </button>
      </div>
    </div>
  );
}
