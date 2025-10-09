"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAccountStatus } from "@/http/api/auth/accountService";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (loading) return;

      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

     const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }


      try {
        const { hasAccount, contaAtiva } = await getAccountStatus(token);

        if (!hasAccount) {
          router.push("/auth/register/account");
          return;
        }

        if (!contaAtiva) {
          router.push("/auth/register/plan");
          return;
        }

        setChecking(false);
      } catch (err) {
        console.error("Erro ao verificar conta/plano:", err);
        router.push("/auth/login");
      }
    };

    verifyUser();
  }, [isAuthenticated, loading, router]);

  if (loading || checking) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Verificando acesso...
      </div>
    );
  }

  return <>{children}</>;
}
