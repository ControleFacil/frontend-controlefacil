import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      
      {/* lado esquerdo */}
      <div>
        <h1 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Controle financeiro de verdade
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Sem fórmulas mágicas. Só estratégias reais para você dominar seu dinheiro.
        </p>

        <Link
          href="#posts"
          className="inline-block mt-8 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
        >
          Explorar conteúdos
        </Link>
      </div>

      {/* lado direito (card grande) */}
      <div className="bg-white/70 backdrop-blur-xl border border-purple-100 rounded-3xl p-8 shadow-lg">
        <p className="text-gray-700 text-lg leading-relaxed">
          “A maioria das pessoas não falha por falta de dinheiro,
          mas por falta de direção financeira.”
        </p>

        <p className="mt-4 text-purple-600 font-semibold">
          — Controle Fácil
        </p>
      </div>

    </section>
  );
}