"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const FEATURES: { key: string; title: string; subtitle?: string; text: string; img: string }[] = [
  {
    key: "gastos",
    title: "Controle de Gastos",
    subtitle: "Registre rápido, entenda onde vai seu dinheiro",
    text:
      "Registre despesas e receitas em segundos. Categorize automaticamente, veja gastos por fornecedor, ajuste recorrências e receba alertas quando o orçamento estiver no limite.",
    img: "/assets/features/gastos.png",
  },
  {
    key: "metas",
    title: "Metas Financeiras",
    subtitle: "Você planeja. Nós mostramos o caminho.",
    text:
      "Crie metas (viagem, reserva de emergência, compra) com previsão de conclusão. Visualize evolução mensal e receba dicas automatizadas para bater a meta.",
    img: "/assets/features/metas.png",
  },
  {
    key: "relatorios",
    title: "Relatórios Inteligentes",
    subtitle: "Gráficos claros e decisões rápidas",
    text:
      "Gráficos por categoria, por pessoa e por período. Exporte em PDF e agende envio semanal por e-mail para acompanhar sua saúde financeira.",
    img: "/assets/features/relatorios.png",
  },
  {
    key: "cartao",
    title: "Gerenciamento de Cartões",
    subtitle: "Datas, vencimentos e parcelamentos organizados",
    text:
      "Veja faturas, vencimentos, parcelamentos e regras de pagamento automático. Evite juros com alertas e simulações de pagamento.",
    img: "/assets/features/cartao.png",
  },
  {
    key: "dashboard",
    title: "Dashboard Personalizado",
    subtitle: "Tudo que você precisa em um só lugar",
    text:
      "Tenha uma visão geral das suas finanças com gráficos, alertas e indicadores de desempenho financeiro em tempo real, totalmente personalizável.",
    img: "/assets/features/dashboard.png",
  },
  {
    key: "despesas",
    title: "Gerenciamento de Despesas",
    subtitle: "Controle total dos seus gastos",
    text:
      "Organize despesas fixas e variáveis, categorize automaticamente e acompanhe a evolução mensal. Receba alertas para não estourar seu orçamento.",
    img: "/assets/features/despesas.png",
  },
  {
    key: "pagamentos",
    title: "Pagamentos Simplificados",
    subtitle: "Pague contas e boletos com facilidade",
    text:
      "Agende pagamentos, acompanhe vencimentos e evite atrasos. Receba notificações e faça transferências de forma segura diretamente pelo aplicativo.",
    img: "/assets/features/pagamentos.png",
  },
];
const TESTIMONIALS = [
  {
    name: "Ana Souza",
    role: "Professora",
    text: "Passei a controlar meus gastos em 2 semanas. Consegui guardar 10% do meu salário sem sofrimento.",
    avatar: "/assets/avatars/woman.png",
  },
  {
    name: "Carlos Mendes",
    role: "Autônomo",
    text: "A versão Premium me ajudou a separar receita pessoal e do trabalho. Essencial!",
    avatar: "/assets/avatars/profile.png",
  },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen font-['Noto_Sans'] bg-background text-gray-900 overflow-x-hidden">
      {/* HERO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Controle seu dinheiro antes que ele te controle
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              O ControleFácil reúne <strong>gastos, metas, relatórios e alertas</strong> em um só lugar.
              Simples de usar, poderoso para transformar sua vida financeira.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/auth/register")}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:-translate-y-1 transition-all"
                transition={{ duration: 0.18 }}
              >
                Criar Conta
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/auth/login")}
                className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50"
                transition={{ duration: 0.18 }}
              >
                Entrar
              </motion.button>
            </motion.div>

            <div className="mt-6 text-sm text-gray-500 max-w-md mx-auto lg:mx-0">
              <span className="inline-block mr-2 font-medium">Planos a partir de</span>
              <span className="inline-block px-3 py-1 rounded bg-purple-100 font-semibold text-purple-700">R$ 29,90 / mês</span>
            </div>
          </div>

          <motion.div
            variants={fadeIn}
            className="w-full lg:w-1/2 flex justify-center"
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-[360px] h-[360px] shadow-2xl rounded-3xl overflow-hidden bg-background"
            >
              <Image
                src="/assets/cfLogo.png"
                alt="ControleFácil preview"
                fill
                className="object-contain p-2"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* PROBLEM / STORY */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="bg-purple-600 text-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold">Até quando você vai viver esse ciclo?</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Você recebe o salário, paga contas, usa o cartão e, antes do fim do mês, já está no cheque especial.
            Mês após mês esse ciclo se repete — até que algo mude. O ControleFácil foi feito pra ser essa mudança.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/auth/register")}
            className="mt-8 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            Quero sair desse ciclo — começar agora
          </motion.button>
        </div>
      </motion.section>

      {/* FEATURES GRID (summary) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="py-20 bg-background"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold text-center text-purple-600">O que o ControleFácil faz por você</motion.h3>
          <motion.p variants={fadeUp} className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
            Tudo que você precisa para organizar sua vida financeira — pensado para ser simples e eficiente.
          </motion.p>

          <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.article
                key={f.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-background rounded-2xl p-6 shadow-md flex flex-col hover:shadow-xl transition-shadow"
              >
                <motion.div whileHover={{ scale: 1.03 }} className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
                  <Image src={f.img} alt={f.title} width={600} height={600} className="object-contain p-4 w-full h-full" />
                </motion.div>

                <h4 className="text-lg font-semibold text-purple-600">{f.title}</h4>
                <p className="text-gray-600 mt-2 flex-1">{f.text}</p>

                <button onClick={() => router.push("/auth/register")} className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Testar
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* DETAILED FEATURE SECTIONS (image left/right) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {FEATURES.map((f, idx) => (
            <div key={f.key} className={`flex flex-col lg:flex-row items-center gap-8 ${idx % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl bg-background">
                  <Image src={f.img} alt={f.title} fill className="object-contain p-4" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <h3 className="text-2xl font-bold text-gray-900">{f.title}</h3>
                <p className="mt-3 text-purple-600 font-medium">{f.subtitle}</p>
                <p className="mt-4 text-gray-600">{f.text}</p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <li className="bg-background p-3 rounded-lg shadow-sm">Rápido registro</li>
                  <li className="bg-background p-3 rounded-lg shadow-sm">Filtros avançados</li>
                  <li className="bg-background p-3 rounded-lg shadow-sm">Alertas inteligentes</li>
                  <li className="bg-background p-3 rounded-lg shadow-sm">Exportar e compartilhar</li>
                </ul>

                <div className="mt-6">
                  <button onClick={() => router.push("/auth/register")} className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-lg font-semibold shadow">
                    Começar agora
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* PLANS / PAYMENT HIGHLIGHT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="py-24 bg-background"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-gray-900"
          >
            Escolha o plano ideal para você
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-gray-600 max-w-2xl mx-auto"
          >
            Comece agora e evolua conforme suas necessidades. Todos os planos
            incluem segurança, backups automáticos e suporte via chat.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PESSOAL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-borderc shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="text-xl font-semibold text-purple-600">
                Pessoal
              </h4>
              <div className="mt-3 text-3xl font-bold text-gray-900">
                R$29<span className="text-base align-top">,90</span>
                <span className="text-sm font-medium text-gray-600">/mês</span>
              </div>
              <p className="mt-4 text-gray-600">
                Ideal para quem está começando a organizar as finanças.
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li>Até 3 contas</li>
                <li>Até 1.000 transações/mês</li>
                <li>Metas e relatórios básicos</li>
                <li>Exportação CSV</li>
              </ul>
              <button
                onClick={() => router.push("/auth/register")}
                className="mt-6 w-full bg-background border border-purple-600 text-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Escolher plano
              </button>
            </motion.div>

            {/* PROFISSIONAL (principal destaque) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-2xl transform scale-105"
            >
              <div className="absolute -top-3 right-5 bg-yellow-400 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full shadow">
                Mais popular
              </div>

              <h4 className="text-xl font-semibold">Profissional</h4>
              <div className="mt-3 text-4xl font-bold">
                R$59<span className="text-base align-top">,90</span>
                <span className="text-sm font-medium">/mês</span>
              </div>
              <p className="mt-4 text-white/90">
                Feito para quem quer controle total das finanças com
                relatórios completos e suporte prioritário.
              </p>

              <ul className="mt-4 text-white/90 space-y-2">
                <li>Até 10 contas</li>
                <li>Até 5.000 transações/mês</li>
                <li>Metas ilimitadas</li>
                <li>Relatórios detalhados e gráficos</li>
                <li>Suporte prioritário</li>
              </ul>

              <button
                onClick={() => router.push("/auth/register")}
                className="mt-6 w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-300 transition-colors"
              >
                Assinar Profissional
              </button>

              <p className="mt-3 text-sm text-white/70">
                Pagamento seguro com cartão — cancele quando quiser.
              </p>
            </motion.div>

            {/* EMPRESARIAL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-borderc shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
            >
              <h4 className="text-xl font-semibold text-gray-700">
                Empresarial
              </h4>
              <div className="mt-3 text-3xl font-bold text-gray-900">
                Em desenvolvimento
              </div>
              <p className="mt-4 text-gray-600">
                A versão Empresarial trará múltiplos usuários, dashboards,
                permissões e relatórios personalizados.
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li>Gestão por equipe</li>
                <li>Relatórios em tempo real</li>
                <li>Integrações avançadas</li>
              </ul>
              <button
                disabled
                className="mt-6 w-full bg-gray-300 text-gray-600 py-2 rounded-lg font-semibold cursor-not-allowed"
              >
                Em breve
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* TESTIMONIALS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20 bg-muted"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h3 variants={fadeUp} className="text-2xl font-bold text-gray-900">O que nossos usuários dizem</motion.h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-2xl shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                    <Image src={t.avatar} alt={t.name} width={56} height={56} className="object-contain p-4" />
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20 bg-background"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center text-gray-900">Perguntas frequentes</h3>
          <div className="mt-6 space-y-4">
            <details className="p-4 border rounded-lg">
              <summary className="font-semibold cursor-pointer">O ControleFácil é seguro?</summary>
              <p className="mt-2 text-gray-600">Sim — usamos criptografia em trânsito e armazenamos apenas o necessário. Integrações bancárias usam provedores seguros.</p>
            </details>

            <details className="p-4 border rounded-lg">
              <summary className="font-semibold cursor-pointer">Posso cancelar a assinatura?</summary>
              <p className="mt-2 text-gray-600">Sim — você pode cancelar a qualquer momento pelo painel. Não há fidelidade.</p>
            </details>
          </div>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-16 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold">Pronto para transformar suas finanças?</h3>
          <p className="mt-3 text-white/90">Comece agora e experimente o plano Premium por 7 dias.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => router.push("/auth/register")} className="bg-background text-purple-600 px-6 py-3 rounded-lg font-semibold">Criar Conta</button>
            <button onClick={() => router.push("/auth/register")} className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold">Assinar Premium</button>
          </div>
        </div>
      </motion.section>

      <footer className="bg-background py-8 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} ControleFácil — Todos os direitos reservados.
      </footer>
    </main>
  );
}
