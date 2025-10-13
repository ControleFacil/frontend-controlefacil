"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col font-['Noto_Sans'] bg-white text-gray-900 overflow-x-hidden">
      {/* HERO */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

        <div className="md:w-1/2 space-y-6 relative z-10">
          <h1 className="text-5xl font-bold leading-tight">
            Simplifique sua vida financeira com{" "}
            <span className="text-purple-600 relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-2 after:bg-purple-200 after:rounded-full">
              ControleFácil
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            O aplicativo inteligente que te ajuda a organizar gastos, planejar
            metas e manter o controle do seu dinheiro de forma simples e visual.
          </p>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => router.push("/auth/register")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Criar Conta Grátis
            </button>
            <button
              onClick={() => router.push("/auth/login")}
              className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Entrar
            </button>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0 relative z-10">
          <Image
            src="/assets/cfLogo.png"
            alt="App ControleFácil"
            width={550}
            height={550}
            className="object-contain hover:scale-105 transition-transform duration-500 ease-in-out"
            priority
          />
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-24 px-8 md:px-20 bg-white text-center relative">
        <h2 className="text-3xl font-semibold mb-4 text-purple-600">
          Controle total das suas finanças
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Com o ControleFácil, você tem acesso a gráficos, relatórios e alertas
          automáticos que te ajudam a entender para onde seu dinheiro está indo.
          Tudo isso com uma interface simples e intuitiva.
        </p>
      </section>

      {/* RECURSOS */}
      <section className="py-20 px-8 md:px-20 bg-purple-50">
        <h2 className="text-3xl font-semibold text-center mb-12 text-purple-600">
          Recursos principais
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Controle de Gastos",
              desc: "Registre despesas e receitas em segundos, com categorias e relatórios automáticos.",
            },
            {
              title: "Metas Financeiras",
              desc: "Crie metas personalizadas e acompanhe seu progresso com gráficos claros e motivadores.",
            },
            {
              title: "Relatórios Inteligentes",
              desc: "Veja onde você gasta mais, receba alertas e mantenha-se no controle de verdade.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-8 shadow-md relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-100 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-500"
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-600 relative">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-8 md:px-20 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.svg')] opacity-10"></div>

        <h2 className="text-3xl font-semibold mb-4 relative z-10">
          Comece hoje com o ControleFácil
        </h2>
        <p className="text-purple-100 mb-8 relative z-10">
          Organize suas finanças, elimine dívidas e conquiste liberdade
          financeira.
        </p>
        <button
          onClick={() => router.push("/auth/register")}
          className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative z-10"
        >
          Criar Conta Grátis
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-center py-6 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} ControleFácil — Todos os direitos reservados.
      </footer>
    </main>
  );
}
