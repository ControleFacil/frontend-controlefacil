import api from "@/lib/axios";

/**
 * Verifica se o usuário autenticado já possui uma conta vinculada
 */
export async function checkUserAccount(token: string): Promise<boolean> {
  const response = await api.get("/api/conta/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data?.hasAccount ?? false;
}

/**
 * Cria uma conta vinculada ao usuário autenticado e ao plano selecionado
 */
export async function createAccount(planId: string, token: string) {
  const response = await api.post(
    "/api/conta",
    { planoId: planId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
}
