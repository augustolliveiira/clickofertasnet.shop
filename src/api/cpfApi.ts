
import { CpfValidationResponse } from '../types';

const API_TOKEN = 'vaicoritnhinas95150b0b9cc3dcb0ae0b24a66514a8360cb293324fb65ffb76f783133018cfc8';

export async function validateCpfApi(cpf: string): Promise<CpfValidationResponse> {
  try {
    const cleanCPF = cpf.replace(/\D/g, '');
    const url = `https://api.dataget.site/api/v1/cpf/${cleanCPF}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Muitas tentativas. Por favor, aguarde alguns minutos.');
      } else if (response.status === 400) {
        throw new Error('CPF inválido. Verifique o número e tente novamente.');
      } else if (response.status === 403) {
        throw new Error('Acesso não autorizado. Tente novamente mais tarde.');
      }
      
      throw new Error('Serviço temporariamente indisponível. Tente novamente mais tarde.');
    }

    const data = await response.json();
    
    if (!data || typeof data !== 'object') {
      throw new Error('Resposta inválida do servidor.');
    }

    return {
      status: 'success',
      message: 'CPF validado com sucesso',
      data: {
        evaluations: 6,
        minValue: 150,
        maxValue: 967.32,
        nome: data.NOME || 'Usuário'
      }
    };
  } catch (error) {
    console.error('Error validating CPF:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Não foi possível validar o CPF. Tente novamente.');
  }
}
