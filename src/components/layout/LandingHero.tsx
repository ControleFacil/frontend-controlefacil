"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingHero: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl p-10 w-full max-w-2xl shadow-[-8px_8px_12px_rgba(168,85,247,0.7)] font-['Noto_Sans'] text-center">
      <h1 className="text-4xl font-semibold mb-3 text-gray-800">
        Controle suas finanças com{" "}
        <span className="text-purple-600">ControleFácil</span>
      </h1>
      <p className="text-black/80 mb-6 text-base font-medium">
        O aplicativo que te ajuda a **organizar gastos, planejar metas** e{" "}
        <span className="text-purple-600 font-semibold">
          alcançar estabilidade financeira
        </span>{" "}
        de forma simples e inteligente.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          onClick={() => router.push("/auth/register")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg transition shadow-md"
        >
          Criar Conta Grátis
        </button>

        <button
          onClick={() => router.push("/auth/login")}
          className="border border-purple-600 hover:bg-purple-50 text-purple-600 font-medium py-3 px-8 rounded-lg transition"
        >
          Já tenho conta
        </button>
      </div>

      <div className="flex justify-center mt-10">
        <Image
          src="/assets/dashboard-preview.svg"
          alt="Preview do app ControleFácil"
          width={600}
          height={400}
          className="object-contain select-none pointer-events-none"
          priority
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400 mt-6">
        <span>Termos</span>
        <span>Privacidade</span>
        <span>Suporte</span>
      </div>
    </div>
  );
};

export default LandingHero;
