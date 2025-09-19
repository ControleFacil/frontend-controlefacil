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
      <Sidebar/>
      <main className="flex-1 p-6 overflow-y-auto">
        <Header/>
        <section className="grid grid-cols-3 gap-7">
          <div className="col-span-2 space-y-10">
            <Goals/>
            <FinancialHealth/>
             <MonthlyView/>
          </div>
          <div className="flex flex-col gap-10">
            <CardInfo/>
            <Transactions/>
            <FutureExpenses/>
          </div>
        </section>
      </main>
    </div>
  );
}
