'use client';

import { useEffect, useState } from "react";
import { getCartoes, CartaoResponse } from "@/http/api/dashboard/dashboardService";
import { CreditCard } from "lucide-react";

export default function CartoesSection() {
  const [cartoes, setCartoes] = useState<CartaoResponse[]>([]);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await getCartoes();
      setCartoes(data);
    };
    fetch();
  }, []);

  if (!cartoes.length) {
    return <p className="text-gray-500">Nenhum cartão encontrado...</p>;
  }

  const primeiro = cartoes[0];

  return (
    <div className="space-y-6">
      <section className="bg-purple-200 text-black rounded-2xl p-6 shadow-lg h-50">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm flex items-center gap-2">
            CARTÃO <img src="/assets/cfLogo.png" alt="CF" className="w-8 h-6" />
          </span>
          <CreditCard className="w-6 h-6" />
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold tracking-wider">
            **** **** **** {primeiro.numeroMascarado}
          </p>
          <p className="text-sm text-black-200">{primeiro.nomeTitular}</p>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span>{primeiro.validade}</span>
          <span className="uppercase">{primeiro.bandeira}</span>
        </div>
      </section>

      {/* Botão Detalhes */}
      <button
        onClick={() => setMostrarDetalhes(!mostrarDetalhes)}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        {mostrarDetalhes ? "Ocultar detalhes" : "Ver todos os cartões"}
      </button>

      {/* Lista de todos os cartões */}
      {mostrarDetalhes && (
        <div className="grid gap-4">
          {cartoes.map((cartao) => (
            <div
              key={cartao.id}
              className="bg-white border rounded-xl p-4 shadow"
            >
              <p className="font-semibold">
                **** **** **** {cartao.numeroMascarado}
              </p>
              <p className="text-sm">{cartao.nomeTitular}</p>
              <div className="flex justify-between text-xs mt-2">
                <span>{cartao.validade}</span>
                <span className="uppercase">{cartao.bandeira}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
