"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-purple-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-gray-600 mb-6">
        A página que você está procurando ainda não foi criada ou não existe.
      </p>
      <Link
        href="/auth/login"
        className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
      >
        Voltar para o Login
      </Link>
    </div>
  );
}
