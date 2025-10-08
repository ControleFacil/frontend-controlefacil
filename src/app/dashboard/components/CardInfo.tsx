'use client';

import { useEffect, useState } from "react";
import { getCartoes, CartaoResponse } from "@/http/api/dashboard/dashboardService";
import { CreditCard } from "lucide-react";

export default function CartoesSection() {
  const [cartoes, setCartoes] = useState<CartaoResponse[]>([]);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCartoes();
        setCartoes(data);
      } catch (error) {
        console.error("Erro ao carregar cartões:", error);
      }
    };
    fetch();
  }, []);

  if (!cartoes.length) {
    return <p className="text-gray-500">Nenhum cartão encontrado...</p>;
  }

  const primeiro = cartoes[0];

  const CartaoItem = ({ cartao, destaque = false }: { cartao: CartaoResponse; destaque?: boolean }) => (
    <section
      className={`rounded-2xl p-6 shadow-lg h-50 transition-transform hover:scale-[1.01]
      ${destaque ? "bg-purple-200 text-black" : "bg-purple-200 border text-gray-800"}`}
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm flex items-center gap-2">
          CARTÃO <img src="/assets/cfLogo.png" alt="CF" className="w-8 h-6" />
        </span>
        <CreditCard className="w-6 h-6" />
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold tracking-wider">
          {cartao.numeroMascarado}
        </p>
        <p className="text-sm text-gray-700">{cartao.nomeTitular}</p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span>{cartao.validade}</span>
        <span className="uppercase">{cartao.bandeira}</span>
      </div>
    </section>
  );

  return (
    <div className="space-y-6">
      <CartaoItem cartao={primeiro} destaque />

      <div className="flex justify-center">
        <button
          onClick={() => setMostrarDetalhes(!mostrarDetalhes)}
          className="bg-gray-200 text-sm font-medium px-5 py-2 rounded-xl hover:bg-gray-300 transition"
        >
          {mostrarDetalhes ? "Ocultar todos os cartões" : "Ver todos os cartões"}
        </button>
      </div>

      {mostrarDetalhes && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartoes.map((cartao) => (
            <CartaoItem key={cartao.id} cartao={cartao} />
          ))}
        </div>
      )}
    </div>
  );
}
