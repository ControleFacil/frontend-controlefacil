"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PagamentoSucesso() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex bg-white overflow-hidden">
      {/* Gradientes */}
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-green-400/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-green-500/30 rounded-full blur-3xl"></div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-center items-center w-full p-6 relative z-10">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-[-8px_8px_12px_rgba(34,197,94,0.5)] text-center font-['Noto_Sans']">
          <Image
            src="/assets/cfLogo.png"
            alt="Pagamento Aprovado"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-green-600 mb-2">Pagamento Aprovado!</h1>
          <p className="text-gray-700 mb-6">
            Seu plano foi ativado com sucesso. Aproveite todos os recursos do{" "}
            <span className="font-semibold">Controle Fácil</span>.
          </p>

          <button
            onClick={() => router.push("/auth/login")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
}
