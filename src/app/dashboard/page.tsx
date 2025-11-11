import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FinancialHealth from "./components/FinancialHealth";
import FinancialSummary from "./components/FinancialSummary";
import MonthlyView from "./components/MonthlyView";
import GastosExpenses from "./components/GastosExpenses";
import EntradasPorDiaSemanaChart from "./components/EntradasPorDiaSemanaChart";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50 gap-4 p-4">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <Header />
        <div className="mt-8 mb-10">
          <FinancialSummary />
        </div>
        <section
          className="
            grid gap-7
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          <div className="space-y-10 md:col-span-2">
            <FinancialHealth />
            <MonthlyView />
            <GastosExpenses />
          </div>
          <div className="space-y-10 md:col-span-2 lg:col-span-1">
            <EntradasPorDiaSemanaChart />
          </div>
        </section>
      </main>
    </div>
  );
}
