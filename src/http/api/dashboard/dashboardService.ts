import api from '@/lib/axios';

export interface MetaResponse {
  id: string;
  titulo: string;
  atual: number;
  meta: number;
}

export interface SaudeFinanceiraResponse {
  percentual: number;
}

export interface CartaoResponse {
  numero: string;
  validade: string;
  titular: string;
  bandeira: string;
}

export interface TransacaoResponse {
  id: string;
  descricao: string;
  valor: number;
  hora: string;
}

export interface GastoFuturoResponse {
  id: string;
  descricao: string;
  valor: number;
}

export interface VisaoMensalResponse {
  mes: string;
  valor: number;
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

export const getSaudeFinanceira = async (): Promise<SaudeFinanceiraResponse> => {
  try {
    const response = await api.get('/api/saude-financeira');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar saúde financeira:', error);
    throw new Error('Não foi possível carregar a saúde financeira');
  }
};

export const getCartao = async (): Promise<CartaoResponse> => {
  try {
    const response = await api.get('/api/cartao');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar informações do cartão:', error);
    throw new Error('Não foi possível carregar as informações do cartão');
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

export const getVisaoMensal = async (): Promise<VisaoMensalResponse[]> => {
  try {
    const response = await api.get('/api/visao-mensal');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar visão mensal:', error);
    throw new Error('Não foi possível carregar a visão mensal');
  }
};