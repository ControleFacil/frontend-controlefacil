"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, hasAccount, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) router.push("/auth/login");
      else if (hasAccount === false) router.push("/auth/register/plan");
    }
  }, [isAuthenticated, hasAccount, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Verificando conta...
      </div>
    );
  }

  return <>{children}</>;
}
