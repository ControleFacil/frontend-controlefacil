import api from "@/lib/axios"; 

export interface UserRequest {
  nome: string;
  email: string;
  senha?: string;
  senhaAtual?: string;
  novaSenha?: string;
}

export interface UserResponse {
  email: string;
  nome?: string;
}

export const getUser = async (): Promise<UserResponse> => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Não foi possível carregar os dados do usuário");
  }
};

export const updateUser = async (data: UserRequest): Promise<UserResponse> => {
  try {
    const response = await api.put("/user/me", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new Error("Não foi possível atualizar os dados do usuário");
  }
};

export const deleteUser = async (senha: string): Promise<void> => {
  try {
    await api.delete("/user", {
      data: { senha },
    });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw new Error("Não foi possível apagar a conta");
  }
};
