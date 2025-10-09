"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/axios";

export default function PaymentPage() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const comprarPlano = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
          alert("Sessão expirada. Faça login novamente.");
          router.push("/auth/login");
          return;
        }

        const response = await api.post(
          `/pagamentos/comprar/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { initPoint } = response.data;

        if (initPoint) {
          window.location.href = initPoint;
        } else {
          alert("Não foi possível gerar o link de pagamento.");
          router.push("/auth/register/plan");
        }
      } catch (e: any) {
        console.error("Erro ao gerar pagamento:", e);
        if (e.response?.status === 403) {
          alert("Acesso negado. Faça login novamente.");
          router.push("/auth/login");
        } else {
          alert("Erro ao gerar pagamento.");
          router.push("/auth/register/plan");
        }
      }
    };

    comprarPlano();
  }, [id, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen font-['Noto_Sans'] text-center px-4">
      <h2 className="text-xl font-semibold mb-2 text-purple-700">
        Gerando link de pagamento...
      </h2>
      <p className="text-gray-600">
        Aguarde enquanto te redirecionamos ao Mercado Pago.
      </p>
    </div>
  );
}
