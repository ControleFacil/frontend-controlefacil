"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const RegisterAccountForm: React.FC = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      setError("Por favor, insira o nome da conta.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        router.push("/auth/login");
        return;
      }

      const response = await api.post(
        "/api/conta",
        { nome },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Conta criada:", response.data);

      alert("Conta criada com sucesso!");
      router.push("/auth/register/plan");
    } catch (err: any) {
      console.error("Erro ao criar conta:", err);
      const mensagem =
        err.response?.data?.message || "Erro ao criar conta. Tente novamente.";
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-[-8px_8px_12px_rgba(168,85,247,0.7)] font-['Noto_Sans']">
      <h2 className="text-2xl font-semibold mb-1 text-gray-800">Crie sua Conta</h2>
      <p className="text-black mb-6 font-medium">
        Configure o nome da sua{" "}
        <span className="text-purple-600 font-semibold">conta principal</span> para continuar.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome da conta"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full text-black border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}

      <div className="flex justify-between text-xs text-gray-400 mt-6">
        <span>Termos e condições</span>
        <span>Suporte</span>
        <span>Ajuda</span>
      </div>
    </div>
  );
};

export default RegisterAccountForm;
