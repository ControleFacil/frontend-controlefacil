"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/ui/button";
import Sidebar from "@/app/dashboard/components/Sidebar";
import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ConfiguracoesUsuario() {
  const [nome, setNome] = useState("CameloDev");
  const [email] = useState("naopodemudar@email.com");

  const handleSave = () => {
    console.log("Salvar alterações:", { nome });
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja apagar sua conta?")) {
      console.log("Conta apagada!");
    }
  };

  return (

    <div className="flex min-h-screen bg-gray-50">
        <Sidebar />


      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col p-10">
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/assets/2pac.jpg"
            alt="Foto do usuário"
            width={55}
            height={55}
            className="rounded-full"
          />
          <div>
            <h2 className="font-semibold text-gray-800">
              Victor Santos / <span className="text-gray-500">Geral</span>
            </h2>
            <p className="text-sm text-gray-500">
              Atualize seu nome de usuário e gerencie sua conta
            </p>
          </div>
        </div>

        {/* Corpo principal */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Menu lateral interno */}
          <div className="w-full md:w-1/4 flex flex-col gap-3 text-sm">
            <button className="font-semibold text-gray-900 text-left">
              Geral
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-left">
              Editar perfil
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-left">
              Senha
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-left">
              Notificações
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-left">
              Preferências
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-left">
              Relatórios
            </button>

            <hr className="my-2" />

            <button
              onClick={handleDelete}
              className="text-red-500 font-medium hover:underline text-left"
            >
              Apagar conta
            </button>
          </div>

          {/* Formulário */}
          <div className="flex-1 max-w-xl">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Nome do usuário
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Use isso para autenticar
                </p>
              </div>

              {/* Botão alinhado ao fim */}
              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-medium mt-3 px-8 py-3 rounded-xl shadow-md"
                >
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
