import api from '@/lib/axios';
import { CategoriaGastoResponse } from "@/app/dashboard/components/GastosExpenses";
export interface MetaResponse {
  id: string;
  titulo: string;
  atual: number;
  meta: number;
  dataLimite: string; 
}
export interface SaudeFinanceiraResponse {
  percentual: number;
}

export interface CartaoResponse {
  id: string;
  numeroMascarado: string;
  validade: string;       
  nomeTitular: string; 
  bandeira: string;        
}

export interface TransacaoResponse {
  id: string;
  descricao: string;
  valor: number;
  categoriaNome: string;
  tipo: "ENTRADA" | "SAIDA";
  hora: string;
}

export interface GastoFuturoResponse {
  id: string;
  descricao: string;
  valor: number;
  data: string;
}

export interface VisaoMensalResponse {
  mes: string;
  entrada: number;
  saida: number;
}
export interface TransacaoRequest {
  valor: number;
  descricao: string;
  tipo: "ENTRADA" | "SAIDA";
  categoriaNome: string;
}
export interface MetaRequest {
  descricao: string;
  valorObjetivo: number;
  valorAtual: number;
  dataLimite: string; 
}

export interface CartaoRequest {
  numero: string;      
  nomeTitular: string;
  validade: string;    
  bandeira: string;
}

export interface EntradasPorDiaResponse {
  diaSemana: string;
  total: number;
}
export type TipoDivida =
  | "PARCELADA"
  | "FIXA"
  | "RECORRENTE"

export interface Divida {
  id: string

  nomeCredor: string
  categoria: string

  tipo: TipoDivida

  valorTotal: number

  quantidadeParcelas: number | null
  parcelasPagas: number

  valorParcela: number
  valorPago: number
  valorRestante: number

  dataPrimeiroVencimento: string
  diaVencimento: number | null

  quitada: boolean

  observacoes?: string

  criadoEm: string
  atualizadoEm: string
}
export interface DividaRequest {
  nomeCredor: string
  categoria: string
  tipo: TipoDivida
  valorTotal: number
  quantidadeParcelas: number | null
  dataPrimeiroVencimento: string
  diaVencimento: number | null
  observacoes?: string
}
export interface PeriodoFiltro {
  inicio: string;
  fim: string;
}
export const getEntradasPorDiaSemana = async (
  periodo: PeriodoFiltro
): Promise<EntradasPorDiaResponse[]> => {

  try {
    const response = await api.get("/api/transacao/entradas-por-dia-semana", {
      params: {
        inicio: periodo.inicio,
        fim: periodo.fim
      }
    });

    return response.data;

  } catch (error) {
    console.error("Erro ao buscar entradas por dia da semana:", error);
    throw new Error("Não foi possível carregar os dados das entradas por dia da semana");
  }
};

// dividas
export const getDividas = async (): Promise<Divida[]> => {
  const { data } = await api.get("/api/dividas")
  return data
}

export const createDivida = async (payload: DividaRequest): Promise<Divida> => {
  const { data } = await api.post("/api/dividas", payload)
  return data
}

export const updateDivida = async (
  id: string,
  payload: Partial<DividaRequest>
): Promise<Divida> => {
  const { data } = await api.put(`/api/dividas/${id}`, payload)
  return data
}

export const deleteDivida = async (id: string) => {
  await api.delete(`/api/dividas/${id}`)
}

export const pagarTudo = async (id: string) => {
  const { data } = await api.post(`/api/dividas/${id}/pagar-tudo`)
  return data
}

export const pagarParcela = async (id: string) => {
  const { data } = await api.post(`/api/dividas/${id}/pagar-parcela`)
  return data
}

export const pagarParcelas = async (id: string, quantidade: number) => {
  const { data } = await api.post(`/api/dividas/${id}/pagar-parcelas`, null, {
    params: { quantidade }
  })
  return data
}

export const pagarValor = async (id: string, valor: number) => {
  const { data } = await api.post(`/api/dividas/${id}/pagar-valor`, null, {
    params: { valor }
  })
  return data
}

export const statusDivida = async (id: string) => {
  const { data } = await api.get(`/api/dividas/${id}/status`)
  return data
}

export const getMetas = async (): Promise<MetaResponse[]> => {
  try {
    const response = await api.get('/api/metas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar metas:', error);
    throw new Error('Não foi possível carregar as metas');
  }
};

export const getGastosPorCategoria = async (
  periodo: PeriodoFiltro
): Promise<CategoriaGastoResponse[]> => {

  try {
    const response = await api.get("/api/transacao/visao-categorias", {
      params: {
        inicio: periodo.inicio,
        fim: periodo.fim
      }
    });

    return response.data;

  } catch (error) {
    console.error("Erro ao buscar gastos por categoria:", error);
    throw new Error("Não foi possível carregar os gastos por categoria");
  }
};
export const getSaudeFinanceira = async (): Promise<SaudeFinanceiraResponse> => {
  try {
    const response = await api.get('/api/saude-financeira');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar saúde financeira:', error);
    throw new Error('Não foi possível carregar a saúde financeira');
  }
};

export const getCartoes = async (): Promise<CartaoResponse[]> => {
  try {
    const { data } = await api.get<CartaoResponse[]>('/api/cartoes');
    return data;
  } catch (error) {
    console.error('Erro ao buscar cartões:', error);
    throw new Error('Não foi possível carregar os cartões');
  }
};

export const getTransacoes = async (limit: number = 5): Promise<TransacaoResponse[]> => {
  try {
    const response = await api.get(`/api/transacoes?limit=${limit}`);
      return response.data;

  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    throw new Error('Não foi possível carregar as transações');
  }
};

export const getGastosFuturos = async (): Promise<GastoFuturoResponse[]> => {
  try {
    const response = await api.get('/api/gastos-futuros');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar gastos futuros:', error);
    throw new Error('Não foi possível carregar os gastos futuros');
  }
};
export const getVisaoMensal = async (
  periodo: PeriodoFiltro
): Promise<VisaoMensalResponse[]> => {

  try {
    const response = await api.get("/api/transacao/visao-mensal", {
      params: {
        inicio: periodo.inicio,
        fim: periodo.fim
      }
    });

    return response.data;

  } catch (error) {
    console.error("Erro ao buscar visão mensal:", error);
    throw new Error("Não foi possível carregar a visão mensal");
  }
};

export const getCategorias = async (): Promise<string[]> => {
  try {
    const response = await api.get("/api/transacao/categorias");
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Não foi possível carregar categorias");
  }
};


// Posts
export const createGastoFuturo = async (gasto: { descricao: string; valor: number; data: string }) => {
  try {
    const response = await api.post('/api/gastos-futuros', gasto);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar gasto futuro:', error);
    throw new Error('Não foi possível criar o gasto futuro');
  }
};
export const createTransacao = async (
  transacao: TransacaoRequest
): Promise<TransacaoResponse> => {
  try {
    const response = await api.post("/api/transacao", transacao);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    throw new Error("Não foi possível criar a transação");
  }
};
export const createMeta = async (
  meta: MetaRequest
): Promise<MetaResponse> => {
  try {
    const response = await api.post("/api/metas", meta);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar meta:", error);
    throw new Error("Não foi possível criar a meta");
  }
};

export const createCartao = async (cartao: CartaoRequest): Promise<CartaoResponse> => {
  try{
  const { data } = await api.post("/api/cartoes", cartao);
  return data;
  } catch(error){
    console.error("Erro ao criar cartão:", error);
    throw new Error("Não foi possível criar o cartão");
  }
};


//Patch
export const updateMetaValor = async (
  id: string,
  valor: number
): Promise<MetaResponse> => {
  try {
    const response = await api.patch(`/api/metas/${id}/valor`, { valor });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar valor da meta:', error);
    throw new Error('Não foi possível atualizar o valor da meta');
  }
};
// Puts
export const updateTransacao = async (
  id: string,
  transacao: TransacaoRequest
): Promise<TransacaoResponse> => {
  try {
    const response = await api.put(`/api/transacao/${id}`, transacao);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    throw new Error("Não foi possível atualizar a transação");
  }
};

export const updateMeta = async (
  id: string,
  meta: MetaRequest
): Promise<MetaResponse> => {
  try {
    const response = await api.put(`/api/metas/${id}`, meta);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar meta:", error);
    throw new Error("Não foi possível atualizar a meta");
  }
};

export const updateCartao = async (id: string, cartao: CartaoRequest): Promise<CartaoResponse> => {
  try{
  const { data } = await api.put(`/api/cartoes/${id}`, cartao);
  return data;
  } catch(error){
    console.error("Erro ao atualizar cartão:", error);
    throw new Error("Não foi possível atualizar o cartão");
  }
};
export const updateGastoFuturo = async (
  id: string,
  gasto: { descricao: string; valor: number; data: string }
): Promise<GastoFuturoResponse> => {
  try {
    const response = await api.put(`/api/gastos-futuros/${id}`, gasto);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar gasto futuro:", error);
    throw new Error("Não foi possível atualizar o gasto futuro");
  }
};


// Deletes
export const deleteTransacao = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/transacao/${id}`);
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    throw new Error("Não foi possível deletar a transação");
  }
};
export const deleteMeta = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/metas/${id}`);
  } catch (error) {
    console.error("Erro ao deletar meta:", error);
    throw new Error("Não foi possível deletar a meta");
  }
};

export const deleteCartao = async (id: string): Promise<void> => {
  try{
    await api.delete(`/api/cartoes/${id}`);
  } catch(error){
    console.error("Erro ao deletar cartão:", error);
    throw new Error("Não foi possível deletar o cartão");
  }
};
export const deleteGastoFuturo = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/gastos-futuros/${id}`);
  } catch (error) {
    console.error("Erro ao deletar gasto futuro:", error);
    throw new Error("Não foi possível deletar o gasto futuro");
  }
};
