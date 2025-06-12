import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Shield, Star, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Timer } from './Timer';
import { validateCPF } from '../utils/cpfValidator';
import { validateCpfApi } from '../api/cpfApi';

interface PixScreenProps {
  balance: number;
  onSubmit: (cpfData?: any) => void;
}

export const PixScreen: React.FC<PixScreenProps> = ({ balance, onSubmit }) => {
  const [pixType, setPixType] = useState<'cpf' | 'telefone' | 'email'>('cpf');
  const [pixKey, setPixKey] = useState('');
  const [isValidatingCpf, setIsValidatingCpf] = useState(false);
  const [cpfError, setCpfError] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPixKey = (value: string, type: 'cpf' | 'telefone' | 'email') => {
    if (type === 'cpf') {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
    } else if (type === 'telefone') {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
    }
    return value;
  };

  const handlePixKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpfError('');
    
    if (pixType === 'email') {
      setPixKey(value.toLowerCase());
    } else {
      const formatted = formatPixKey(value, pixType);
      setPixKey(formatted);
    }
  };

  const handleSubmit = async () => {
    if (pixType === 'cpf') {
      const cleanCPF = pixKey.replace(/\D/g, '');
      
      if (!validateCPF(cleanCPF)) {
        setCpfError('CPF inválido. Verifique o número e tente novamente.');
        return;
      }

      try {
        setIsValidatingCpf(true);
        setCpfError('');

        const response = await validateCpfApi(cleanCPF);
        
        if (response.status === 'error') {
          throw new Error(response.message || 'Erro ao validar CPF');
        }

        const cpfData = {
          cpf: cleanCPF,
          evaluations: response.data?.evaluations || 6,
          minValue: response.data?.minValue || 150,
          maxValue: response.data?.maxValue || 1548.00,
          nome: response.data?.nome || 'Usuário'
        };

        // Passa os dados do CPF para a próxima tela
        onSubmit(cpfData);
      } catch (err) {
        console.error('Validation error:', err);
        setCpfError(err instanceof Error ? err.message : 'Erro ao validar CPF');
      } finally {
        setIsValidatingCpf(false);
      }
    } else {
      // Para outras chaves PIX, continua normalmente
      onSubmit();
    }
  };

  const getPlaceholder = () => {
    switch (pixType) {
      case 'cpf':
        return '000.000.000-00';
      case 'telefone':
        return '(00) 00000-0000';
      case 'email':
        return 'seu.email@exemplo.com';
      default:
        return '';
    }
  };

  const isValidKey = () => {
    switch (pixType) {
      case 'cpf':
        return pixKey.replace(/\D/g, '').length === 11 && !cpfError && !isValidatingCpf;
      case 'telefone':
        return pixKey.replace(/\D/g, '').length === 11;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pixKey);
      default:
        return false;
    }
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-md w-full text-center relative z-10"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-4 right-4">
        <Timer duration={300} onComplete={() => onSubmit()} variant="warning" />
      </div>

      <motion.h1 
        className="text-3xl font-bold text-gray-800 mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Digite sua Chave PIX
      </motion.h1>

      <motion.p 
        className="text-lg text-gray-600 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Escolha o tipo de chave PIX para receber
      </motion.p>

      <motion.div
        className="text-4xl font-bold text-primary mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {formatCurrency(balance)}
      </motion.div>

      <motion.div 
        className="grid grid-cols-3 gap-2 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <button
          className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            pixType === 'cpf' 
              ? 'bg-primary text-white shadow-lg scale-105' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => {
            setPixType('cpf');
            setPixKey('');
            setCpfError('');
          }}
        >
          CPF
        </button>
        <button
          className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            pixType === 'telefone' 
              ? 'bg-primary text-white shadow-lg scale-105' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => {
            setPixType('telefone');
            setPixKey('');
            setCpfError('');
          }}
        >
          Telefone
        </button>
        <button
          className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            pixType === 'email' 
              ? 'bg-primary text-white shadow-lg scale-105' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => {
            setPixType('email');
            setPixKey('');
            setCpfError('');
          }}
        >
          Email
        </button>
      </motion.div>

      <motion.div 
        className="relative mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <input
          type={pixType === 'email' ? 'email' : 'text'}
          value={pixKey}
          onChange={handlePixKeyChange}
          placeholder={getPlaceholder()}
          className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none text-lg ${
            cpfError ? 'border-red-300 focus:border-red-500' : 
            'border-gray-200 focus:border-primary'
          }`}
          maxLength={pixType === 'cpf' ? 14 : pixType === 'telefone' ? 15 : undefined}
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isValidatingCpf && pixType === 'cpf' && (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          )}
        </div>

        {cpfError && (
          <motion.p
            className="mt-2 text-sm text-red-500 flex items-center gap-1 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle className="w-4 h-4" />
            {cpfError}
          </motion.p>
        )}
      </motion.div>

      <motion.button
        onClick={handleSubmit}
        disabled={!isValidKey() || isValidatingCpf}
        className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          !isValidKey() || isValidatingCpf
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105'
        }`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        whileHover={isValidKey() && !isValidatingCpf ? { scale: 1.05 } : {}}
        whileTap={isValidKey() && !isValidatingCpf ? { scale: 0.95 } : {}}
      >
        {isValidatingCpf ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Validando...
          </>
        ) : (
          <>
            Continuar
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>

      <motion.p
        className="mt-4 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {pixType === 'cpf' ? 
          'Seu CPF será validado automaticamente para garantir a segurança' :
          'Você receberá o pagamento na chave PIX selecionada'
        }
      </motion.p>
    </motion.div>
  );
};