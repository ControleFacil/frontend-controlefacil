"use client";

import React, { useState } from "react";
import Image from "next/image";
import { loginDashboard } from "@/http/api/auth/authService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-[-8px_8px_12px_rgba(168,85,247,0.7)]">
      <h2 className="text-2xl font-semibold mb-1 text-gray-800">Login</h2>
      <p className="text-black mb-6 font-noto font-medium">
        É prazer ter VOCÊ de volta
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-black border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border text-black rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex items-center text-sm">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="mr-2"
          />
          <label htmlFor="remember" className="text-gray-600">
            Me lembre
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
      <div className="mt-3 text-sm text-purple-600 cursor-pointer"> 
        Esqueceu a senha? 
        </div> 
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex items-center my-5"> 
          <div className="flex-grow border-t border-black">
            </div> 
            <span className="mx-4 text-black text-xs">ou</span>
             <div className="flex-grow border-t border-black"></div> 
             </div>
             <div className="flex gap-9 justify-center"> 
              <button className="px-2 py-2 rounded-lg flex items-center text-sm hover:bg-gray-50 transition">
                 <Image src="/assets/googleIcon.png" alt="Google" width={25} height={25} /> 
                 </button> 
              <button className="px-2 py-2 rounded-lg flex items-center text-sm hover:bg-gray-50 transition"> 
                  <Image src="/assets/facebook.png" alt="Facebook" width={25} height={25} /> </button> 
                  </div> <p className="text-xs text-center text-gray-500 mt-6"> Ainda não tem uma conta?{""} 
                    <span className="text-purple-600 cursor-pointer font-medium" onClick={() => router.push("/auth/register")}> Crie agora </span> 
                    </p> 
                    <div className="flex justify-between text-xs text-gray-400 mt-6"> 
                      <span>Termos e condições</span> 
                      <span>Suporte</span> 
                      <span>Ajuda</span> 
                      </div> 
                    </div> 
                 ); 
                };

export default LoginForm;
