'use client';

import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { getCartao, CartaoResponse } from "@/http/api/dashboard/dashboardService";

export default function CardInfo() {
  const [cartao, setCartao] = useState<CartaoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartao = async () => {
      try {
        setLoading(true);
        const data = await getCartao();
        setCartao(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar cartão');
      } finally {
        setLoading(false);
      }
    };

    fetchCartao();
  }, []);

  if (loading) {
    return (
      <section className="bg-purple-200 text-black rounded-2xl p-6 shadow-lg h-50 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm flex items-center gap-2">
            CARTÃO<div className="w-8 h-6 bg-purple-300 rounded"></div>
          </span>
          <div className="w-6 h-6 bg-purple-300 rounded"></div>
        </div>
        <div className="mb-6">
          <div className="h-6 bg-purple-300 rounded mb-2"></div>
          <div className="h-4 bg-purple-300 rounded w-1/2"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-purple-300 rounded w-1/3"></div>
          <div className="h-4 bg-purple-300 rounded w-1/3"></div>
        </div>
      </section>
    );
  }

  if (error || !cartao) {
    return (
      <section className="bg-purple-200 text-black rounded-2xl p-6 shadow-lg h-50">
        <div className="text-center text-red-500">
          Erro ao carregar informações do cartão
        </div>
      </section>
    );
  }

  return (
    <section className="bg-purple-200 text-black rounded-2xl p-6 shadow-lg h-50">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm flex items-center gap-2">
          CARTÃO<img src="/assets/cfLogo.png" alt="CF" className="w-8 h-6" />
        </span>
        <CreditCard className="w-6 h-6" />
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold tracking-wider">{cartao.numero}</p>
        <p className="text-sm text-black-200">{cartao.validade}</p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span>{cartao.titular}</span>
        <span className="uppercase">{cartao.bandeira}</span>
      </div>
    </section>
  );
}