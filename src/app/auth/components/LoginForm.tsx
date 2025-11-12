"use client";

import React, { useState } from "react";
import Image from "next/image";
import { loginDashboard } from "@/http/api/auth/authService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginDashboard(email, password, remember);
      login(data.token, email, remember);
    } catch (err: any) {
      console.error("Erro ao logar:", err);
      setError("E-mail ou senha inválidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-8 w-full max-w-md shadow-[-8px_8px_12px_rgba(168,85,247,0.7)]"
    >
      <h2 className="text-2xl font-semibold mb-1 text-gray-800">Login</h2>
      <p className="text-black mb-6 font-noto font-medium">
        É um prazer ter{" "}
        <span className="text-purple-600 font-semibold">você</span> de volta!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo E-mail */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-black border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
        </motion.div>

        {/* Campo Senha com olho */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border text-black rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600 transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </motion.div>

        {/* Checkbox e lembrar-me */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center text-sm"
        >
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="mr-2 accent-purple-600"
          />
          <label htmlFor="remember" className="text-gray-600 cursor-pointer">
            Me lembre
          </label>
        </motion.div>

        {/* Botão de login animado */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className={`w-full font-medium py-2 rounded-lg transition ${
            loading
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white shadow-md"
          }`}
        >
          {loading ? "Entrando..." : "Login"}
        </motion.button>
      </form>

      {/* Esqueceu senha */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-sm text-purple-600 cursor-pointer hover:underline text-center"
      >
        Esqueceu a senha? (em breve)
      </motion.div>

      {/* Mensagem de erro animada */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-red-500 text-sm mt-3 justify-center"
          >
            <AlertCircle size={16} />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Separador */}
      <div className="flex items-center my-5">
        <div className="flex-grow border-t border-black"></div>
        <span className="mx-4 text-black text-xs">ou</span>
        <div className="flex-grow border-t border-black"></div>
      </div>

      {/* Botões sociais */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-9 justify-center"
      >
        <button className="px-2 py-2 rounded-lg flex items-center text-sm hover:bg-gray-50 transition">
          <Image src="/assets/googleIcon.png" alt="Google" width={25} height={25} />
            <p>em breve</p>
        </button>
        <button className="px-2 py-2 rounded-lg flex items-center text-sm hover:bg-gray-50 transition">
          <Image src="/assets/facebook.png" alt="Facebook" width={25} height={25} />
           <p>em breve</p>
        </button>
      </motion.div>

      {/* Criar conta */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-center text-gray-500 mt-6"
      >
        Ainda não tem uma conta?{" "}
        <span
          className="text-purple-600 cursor-pointer font-medium hover:underline"
          onClick={() => router.push("/auth/register")}
        >
          Crie agora
        </span>
      </motion.p>

      {/* Rodapé */}
      <div className="flex justify-between text-xs text-gray-400 mt-6">
        <span>Termos e condições</span>
        <span>Suporte</span>
        <span>Ajuda</span>
      </div>
    </motion.div>
  );
};

export default LoginForm;
