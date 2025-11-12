"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Eye, EyeOff } from "lucide-react"; // 👁️ usando ícones bonitos

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formValido, setFormValido] = useState(false);

  // ✅ Mesmas validações do backend
  const nomeCompletoValido = (n: string, s: string) =>
    /^[A-Za-zÀ-ÿ]+(\s+[A-Za-zÀ-ÿ]+)+$/.test(`${n} ${s}`.trim());

  const emailValido = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const senhaValida = (s: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(s);

  // 🧠 Atualiza a validade do formulário
  useEffect(() => {
    setFormValido(
      nomeCompletoValido(nome, sobrenome) &&
        emailValido(email) &&
        senhaValida(senha) &&
        senha === confirmarSenha
    );
  }, [nome, sobrenome, email, senha, confirmarSenha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValido) {
      setError("Preencha todos os campos corretamente antes de continuar.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fullName = `${nome} ${sobrenome}`.trim();

      const response = await api.post("/user", {
        nome: fullName,
        email,
        senha,
      });

      console.log("Resposta da API:", response.data);

      if (response?.data?.email) {
        alert("Conta criada com sucesso! Faça login para continuar.");
        router.push("/auth/login");
      } else {
        throw new Error("Falha ao criar usuário. Nenhum dado retornado.");
      }
    } catch (err: any) {
      console.error("Erro ao criar conta:", err);

      const mensagem =
        err.response?.status === 409
          ? "E-mail já cadastrado. Tente outro."
          : err.response?.data?.message ||
            "Erro ao criar conta. Verifique os dados e tente novamente.";

      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-[-8px_8px_12px_rgba(168,85,247,0.7)] font-['Noto_Sans']">
      <h2 className="text-2xl font-semibold mb-1 text-gray-800">
        Crie seu Usuário
      </h2>
      <p className="text-black mb-6 font-medium">
        É um prazer ter{" "}
        <span className="text-purple-600 font-semibold">você</span> com a gente!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full text-black border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          className="w-full text-black border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        {!nomeCompletoValido(nome, sobrenome) && nome && sobrenome && (
          <p className="text-red-500 text-xs">
            Informe seu nome completo (nome e sobrenome válidos).
          </p>
        )}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full text-black border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
            emailValido(email)
              ? "focus:ring-green-500"
              : "focus:ring-red-500 border-red-300"
          }`}
          required
        />

        {/* Campo senha com olho */}
        <div className="relative">
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={`w-full text-black border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 ${
              senhaValida(senha)
                ? "focus:ring-green-500"
                : "focus:ring-red-500 border-red-300"
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-purple-600 transition"
          >
            {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Campo confirmar senha com olho */}
        <div className="relative">
          <input
            type={mostrarConfirmar ? "text" : "password"}
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className={`w-full text-black border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 ${
              senha === confirmarSenha && confirmarSenha.length > 0
                ? "focus:ring-green-500"
                : "focus:ring-red-500 border-red-300"
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-purple-600 transition"
          >
            {mostrarConfirmar ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          A senha deve conter:
          <br />• Mínimo de 8 caracteres
          <br />• Uma letra maiúscula
          <br />• Um número
          <br />• Um símbolo (@$!%*?&)
        </p>

        <button
          type="submit"
          disabled={!formValido || loading}
          className={`w-full text-white font-medium py-2 rounded-lg transition ${
            formValido && !loading
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
      )}

      <div className="flex items-center my-5">
        <div className="flex-grow border-t border-black"></div>
        <span className="mx-4 text-black text-xs">ou</span>
        <div className="flex-grow border-t border-black"></div>
      </div>

      <div className="flex gap-9 justify-center">
        <button className="px-2 py-2 rounded-lg flex items-center text-sm hover:bg-gray-50 transition">
          <Image
            src="/assets/googleIcon.png"
            alt="Google"
            width={25}
            height={25}
          />
        </button>
        <button className="px-2 py-2 rounded-lg flex items-center text-sm hover:bg-gray-50 transition">
          <Image src="/assets/facebook.png" alt="Facebook" width={25} height={25} />
        </button>
      </div>

      <div className="flex justify-between text-xs text-gray-400 mt-6">
        <span>Termos e condições</span>
        <span>Suporte</span>
        <span>Ajuda</span>
      </div>
    </div>
  );
};

export default RegisterForm;
