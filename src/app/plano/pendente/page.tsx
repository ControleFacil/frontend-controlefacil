"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PagamentoPendente() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex bg-white overflow-hidden">
      {/* Gradientes */}
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-yellow-400/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-yellow-500/30 rounded-full blur-3xl"></div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-center items-center w-full p-6 relative z-10">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-[-8px_8px_12px_rgba(234,179,8,0.5)] text-center font-['Noto_Sans']">
          <Image
            src="/assets/pending.svg"
            alt="Pagamento Pendente"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-yellow-600 mb-2">Pagamento em Análise</h1>
          <p className="text-gray-700 mb-6">
            Estamos processando o seu pagamento. Assim que for aprovado, seu plano será ativado automaticamente.
          </p>

          <button
            onClick={() => router.push("/")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
