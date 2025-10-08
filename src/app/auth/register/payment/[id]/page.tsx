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
        const response = await api.post(`/pagamentos/comprar/${id}`);
        const { linkPagamento } = response.data;
        window.location.href = linkPagamento;
      } catch (e) {
        alert("Erro ao gerar pagamento");
        router.push("/register/plan");
      }
    };
    comprarPlano();
  }, [id, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen font-['Noto Sans']">
      <h2 className="text-xl font-semibold">Gerando link de pagamento...</h2>
      <p>Aguarde enquanto te redirecionamos ao Mercado Pago.</p>
    </div>
  );
}
