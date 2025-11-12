"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formValido, setFormValido] = useState(false);

  // Validações
  const nomeCompletoValido = (n: string, s: string) =>
    /^[A-Za-zÀ-ÿ]+(\s+[A-Za-zÀ-ÿ]+)+$/.test(`${n} ${s}`.trim());
  const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const senhaValida = (s: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(s);

  // Requisitos da senha
  const requisitosSenha = [
    { label: "Mínimo de 8 caracteres", valid: senha.length >= 8 },
    { label: "Uma letra maiúscula", valid: /[A-Z]/.test(senha) },
    { label: "Um número", valid: /\d/.test(senha) },
    { label: "Um símbolo (@$!%*?&)", valid: /[@$!%*?&]/.test(senha) },
  ];

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

      if (response?.data?.email) {
        alert("Conta criada com sucesso! Faça login para continuar.");
        router.push("/auth/login");
      } else {
        throw new Error("Falha ao criar usuário.");
      }
    } catch (err: any) {
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-8 w-full max-w-md shadow-[-8px_8px_12px_rgba(168,85,247,0.7)] font-['Noto_Sans']"
    >
      <h2 className="text-2xl font-semibold mb-1 text-gray-800">
        Crie seu Usuário
      </h2>
      <p className="text-black mb-6 font-medium">
        É um prazer ter{" "}
        <span className="text-purple-600 font-semibold">você</span> com a gente!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 relative">
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

        {/* Campo de senha com olho */}
        <div className="relative">
          <input
            type={showSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={`w-full text-black border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              senhaValida(senha)
                ? "focus:ring-green-500"
                : "focus:ring-red-500 border-red-300"
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowSenha(!showSenha)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
          >
            {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmarSenha ? "text" : "password"}
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className={`w-full text-black border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              senha === confirmarSenha && confirmarSenha.length > 0
                ? "focus:ring-green-500"
                : "focus:ring-red-500 border-red-300"
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
          >
            {showConfirmarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Checklist animado */}
        <div className="mt-3 space-y-1 text-sm">
          {requisitosSenha.map((req, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2"
            >
              {req.valid ? (
                <CheckCircle className="text-green-500 w-4 h-4" />
              ) : (
                <XCircle className="text-red-400 w-4 h-4" />
              )}
              <span
                className={`${
                  req.valid ? "text-green-600" : "text-gray-500"
                } transition`}
              >
                {req.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          type="submit"
          disabled={!formValido || loading}
          className={`w-full text-white font-medium py-2 rounded-lg transition ${
            formValido && !loading
              ? "bg-purple-600 hover:bg-purple-700 shadow-md"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </motion.button>
      </form>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-sm mt-3 text-center"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RegisterForm;
