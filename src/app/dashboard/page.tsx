import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Goals from "./components/Goals";
import FinancialHealth from "./components/FinancialHealth";
import CardInfo from "./components/CardInfo";
import Transactions from "./components/Transactions";
import MonthlyView from "./components/MonthlyView";
import FutureExpenses from "./components/FutureExpenses";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Header />

        {/* Seção dos cards pequenos */}
        <section className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">Saúde</div>
          <div className="bg-white p-4 rounded-xl shadow">Mercado</div>
          <div className="bg-white p-4 rounded-xl shadow">Lazer</div>
          <div className="bg-white p-4 rounded-xl shadow">Casa</div>
        </section>

        {/* Metas / Saúde financeira / Cartão */}
        <section className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <Goals />
            <FinancialHealth />
          </div>
          <CardInfo/>
        </section>

        {/* Visão mensal / Gastos futuros */}
        <section className="grid grid-cols-3 gap-4 mt-6">
          <MonthlyView />
          <FutureExpenses />
        </section>

        {/* Transações */}
        <section className="mt-6">
          <Transactions />
        </section>
      </main>
    </div>
  );
}
