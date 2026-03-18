"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-purple-100 bg-gradient-to-br from-gray-50 to-purple-50">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        
        {/* Logo / Marca */}
        <div>
          <h2 className="text-xl font-bold text-purple-600">
            Controle Fácil
          </h2>
          <p className="text-gray-600 mt-3 text-sm">
            Simplificando finanças, investimentos e decisões inteligentes com dinheiro.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            Navegação
          </h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link href="/" className="hover:text-purple-600 transition">
                Início
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-purple-600 transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            Redes sociais
          </h3>

          <div className="flex gap-4">
            
            <a
              href="https://instagram.com/controlefacill"
              target="_blank"
              className="p-3 rounded-xl bg-white border border-purple-100 hover:bg-purple-100 transition group"
            >
              <Instagram className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition" />
            </a>

          </div>
        </div>

      </div>

      {/* linha final */}
      <div className="border-t border-purple-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Controle Fácil — Todos os direitos reservados.
      </div>

    </footer>
  );
}