export default function EditorialSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
      
      {/* card grande */}
      <div className="md:col-span-2 bg-purple-600 text-white rounded-3xl p-10">
        <h2 className="text-3xl font-bold mb-4">
          Educação financeira sem enrolação
        </h2>
        <p className="text-white/90">
          Conteúdos diretos ao ponto para você sair do zero e evoluir rápido.
        </p>
      </div>

      {/* card menor */}
      <div className="bg-white/70 backdrop-blur-xl border border-purple-100 rounded-3xl p-6">
        <h3 className="font-semibold text-gray-800">
          Comece pelo básico
        </h3>
        <p className="text-gray-600 mt-2 text-sm">
          Entenda como organizar seu dinheiro antes de investir.
        </p>
      </div>

      {/* card menor */}
      <div className="bg-white/70 backdrop-blur-xl border border-purple-100 rounded-3xl p-6">
        <h3 className="font-semibold text-gray-800">
          Evite erros comuns
        </h3>
        <p className="text-gray-600 mt-2 text-sm">
          Pare de perder dinheiro com decisões ruins.
        </p>
      </div>

      {/* card grande invertido */}
      <div className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-purple-100 rounded-3xl p-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Informação que gera resultado
        </h2>
        <p className="text-gray-600 mt-4">
          Tudo aqui foi pensado para aplicação prática.
        </p>
      </div>

    </section>
  );
}