"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import { Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

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
    <main className="min-h-screen font-['Noto_Sans'] bg-gradient-to-br from-purple-50 to-white px-6 py-16 flex flex-col items-center">
      {/* HEADER */}
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="w-full max-w-6xl text-center mb-14"
      >
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <Image src="/assets/cfLogo.png" alt="Controle Fácil" width={40} height={40} />
          <h1 className="text-3xl font-extrabold text-purple-700">Controle Fácil</h1>
        </div>
        <p className="text-sm text-gray-600">Passo 2 de 3</p>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-900">
          Escolha o plano ideal para você
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Todos os planos incluem segurança, backups automáticos, relatórios avançados e suporte via chat.
        </p>
      </motion.header>

      {/* SEÇÃO PRINCIPAL: texto + planos */}
      <section className="w-full max-w-7xl flex flex-col md:flex-row items-start gap-12">
        
        {/* LADO DO TEXTO */}
        <motion.div
          className="flex-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-gray-700 mb-6">
            Conheça nossos planos e escolha o que melhor se adapta às suas necessidades. Todos vêm com suporte, relatórios e segurança.
          </p>

          {/* Caixa de Suporte via WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-green-50 border border-green-300 p-4 rounded-2xl shadow-md w-full max-w-sm"
          >
            <h3 className="text-green-900 font-bold text-base flex items-center gap-2">
              Suporte via WhatsApp
            </h3>
            <p className="text-green-800 text-xs mt-1 leading-relaxed">
              Tire dúvidas sobre os planos e peça <strong>7 dias grátis</strong>.
            </p>
            <button
              onClick={() => window.open("https://wa.me/559982777761", "_blank")}
              className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow"
            >
              <Image src="/assets/whatsapp.png" alt="WhatsApp" width={18} height={18} />
              Falar no WhatsApp
            </button>
          </motion.div>
        </motion.div>

        {/* LADO DOS PLANOS - Carousel horizontal */}
        <motion.div
          className="flex-1 overflow-x-auto flex gap-6 pb-4 snap-x snap-mandatory"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {planos.map((plano, idx) => {
            const isSelected = selected === plano.id;
            return (
              <motion.article
                key={plano.id}
                onClick={() => setSelected(plano.id)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 cursor-pointer transition-transform duration-300 transform snap-start min-w-[280px] md:min-w-[320px]
                  ${isSelected ? "scale-[1.05] shadow-2xl bg-gradient-to-br from-purple-600 to-purple-500 text-white border border-purple-500" : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"}
                `}
                aria-pressed={isSelected}
                role="button"
              >
                {/* Popular Badge */}
                {plano.popular && !isSelected && (
                  <span className="absolute -top-3 right-4 bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Mais popular
                  </span>
                )}

                {/* Título */}
                <div
                  className={`mb-5 inline-block rounded-xl px-4 py-2 font-semibold text-lg ${
                    isSelected ? "bg-white/10 text-white" : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {plano.nome.charAt(0).toUpperCase() + plano.nome.slice(1).toLowerCase()}
                </div>

                {/* Preço */}
                <div className={`text-4xl font-bold mb-3 ${isSelected ? "text-white" : "text-gray-900"}`}>
                  R$ {plano.precoMensal.toFixed(2)}
                  <span className={`text-sm font-medium ml-2 ${isSelected ? "text-white/80" : "text-gray-600"}`}>
                    /mês
                  </span>
                </div>

                {/* Descrição curta */}
                {plano.descricao && (
                  <p className={`mb-6 ${isSelected ? "text-white/90" : "text-gray-600"}`}>
                    {plano.descricao}
                  </p>
                )}

                {/* Features */}
                <ul className={`space-y-3 mb-8 text-sm ${isSelected ? "text-white/90" : "text-gray-700"}`}>
                  <li>Preço mensal: R$ {plano.precoMensal.toFixed(2)}</li>
                  <li>Acesso ao Bot WhatsApp</li>
                  <li>Limite de {plano.limiteTransacoes} transações/mês</li>
                  <li>{plano.suportePrioritario ? "Suporte prioritário" : "Sem suporte prioritário"}</li>
                  <li>Relatórios avançados</li>
                  <li>Backups automáticos</li>
                  <li>Suporte via chat</li>
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(plano.id);
                    }}
                    className={`px-5 py-3 rounded-lg font-semibold text-sm transition
                      ${isSelected ? "bg-white text-purple-700 hover:bg-white/90" : "bg-purple-600 text-white hover:bg-purple-500"}
                    `}
                  >
                    {isSelected ? "Selecionado" : "Selecionar"}
                  </button>

                  {isSelected && (
                    <div className="ml-auto bg-white text-purple-600 rounded-full p-1 shadow-md">
                      <Check size={20} />
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* Footer / Botão continuar */}
      <div className="mt-12 text-center w-full max-w-7xl">
        <p className="text-xs text-gray-500 mb-4">Informações importantes</p>
        <button
          onClick={handleNext}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium px-12 py-4 rounded-xl shadow-lg hover:opacity-95 transition disabled:opacity-50"
        >
          {loading ? "Carregando..." : "Próximo"}
        </button>
      </div>
    </main>
  );
}
