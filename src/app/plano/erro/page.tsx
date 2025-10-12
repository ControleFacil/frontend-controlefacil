"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PagamentoErro() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex bg-white overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-red-400/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-red-500/30 rounded-full blur-3xl"></div>

      <div className="flex flex-col justify-center items-center w-full p-6 relative z-10">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-[-8px_8px_12px_rgba(239,68,68,0.5)] text-center font-['Noto_Sans']">
          <Image
            src="/assets/error.svg"
            alt="Pagamento Falhou"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-red-600 mb-2">Pagamento Não Processado</h1>
          <p className="text-gray-700 mb-6">
            Ocorreu um erro ao processar seu pagamento. Tente novamente ou utilize outro método de pagamento.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/auth/register/plan")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
            >
              Tentar Novamente
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg transition"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
