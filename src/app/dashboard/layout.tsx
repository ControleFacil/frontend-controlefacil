
import ProtectedRoute from "@/app/provider/provider";
import { PeriodoProvider } from "@/context/PeriodoContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <PeriodoProvider>
        {children}
      </PeriodoProvider>
    </ProtectedRoute>
  );
}
