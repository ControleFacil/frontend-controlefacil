import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
  timeout: 150000, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

const publicEndpoints = ["/auth/login", "/auth/register", "/users"];

api.interceptors.request.use((config) => {
  const isPublic = publicEndpoints.some((endpoint) =>
    config.url?.startsWith(endpoint)
  );

  if (typeof window !== "undefined" && !isPublic) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.info(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, request, config } = error;

    // 404: recurso não encontrado
    if (response && response.status === 404) {
      console.warn(`404 - Recurso não encontrado em: ${config.url}`);
      return Promise.resolve({
        data: null,
        status: 404,
        config,
        headers: response.headers,
      });
    }

    // Timeout ou sem resposta
    if (error.code === "ECONNABORTED") {
      error.message = "Tempo de requisição excedido.";
    } else if (request && !response) {
      error.message = "Falha de conexão com o servidor.";
    }

    // Erros de resposta HTTP
    if (response) {
      const resData = response.data;
      const defaultMessage = `Erro ${response.status}`;
      let errorMessage = "";

      if (typeof resData === "string") errorMessage = resData;
      else if (resData?.message) errorMessage = resData.message;
      else if (resData?.error) errorMessage = resData.error;
      else errorMessage = defaultMessage;

      error.message = errorMessage;

      switch (response.status) {
        case 401:
        case 403:
          // Limpa apenas o token e email, sem apagar todo storage
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            sessionStorage.removeItem("userEmail");

            window.location.href = "/auth/login";
          }
          break;

        case 500:
          error.message = "Erro interno no servidor.";
          break;

        default:
          break;
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.error(`[API Error] ${error.message}`, error);
    }

    return Promise.reject(error);
  }
);

export default api;
