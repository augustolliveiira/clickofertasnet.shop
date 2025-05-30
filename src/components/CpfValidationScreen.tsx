import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, DollarSign, Star, ArrowRight, ChevronLeft } from 'lucide-react';
import { validateCPF } from '../utils/cpfValidator';
import { validateCpfApi } from '../api/cpfApi';

interface CpfValidationScreenProps {
  onValidationComplete: (cpf: string, evaluations: number, minValue: number, maxValue: number, nome: string) => void;
  onBack: () => void;
}

export const CpfValidationScreen: React.FC<CpfValidationScreenProps> = ({
  onValidationComplete,
  onBack
}) => {
  const [cpf, setCpf] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [stage, setStage] = useState<'input' | 'validating' | 'calculating'>('input');
  const [progress, setProgress] = useState(0);

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    setError('');
  };

  const validateAndCalculate = async () => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (!validateCPF(cleanCPF)) {
      setError('CPF inválido. Por favor, verifique e tente novamente.');
      return;
    }

    try {
      setStage('validating');
      setIsValidating(true);
      setError('');

      const response = await validateCpfApi(cleanCPF);
      
      if (response.status === 'error') {
        throw new Error(response.message || 'Erro ao validar CPF');
      }

      setStage('calculating');
      
      // Progress animation
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setProgress(i);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      
      const evaluations = response.data?.evaluations || 6;
      const minValue = response.data?.minValue || 150;
      const maxValue = response.data?.maxValue || 967.32;
      const nome = response.data?.nome || 'Usuário';

      onValidationComplete(cleanCPF, evaluations, minValue, maxValue, nome);
    } catch (err) {
      console.error('Validation error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao validar CPF');
      setStage('input');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-purple-400">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      <motion.div 
        className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {stage === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <DollarSign className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Descubra Seu Potencial
                </h2>
                <p className="text-gray-600 mb-2">
                  Digite seu CPF para descobrir quanto você pode ganhar hoje
                </p>
                <div className="text-2xl font-bold text-primary animate-pulse">
                  Até R$ 967,32
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={handleCPFChange}
                    placeholder="000.000.000-00"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      error ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:border-primary text-lg transition-colors duration-200`}
                    maxLength={14}
                  />
                  {error && (
                    <motion.p
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onBack}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 border-gray-200 font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </button>
                  <button
                    onClick={validateAndCalculate}
                    disabled={cpf.length < 14 || isValidating}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2 group
                      ${cpf.length < 14 || isValidating
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg transform hover:scale-105 transition-all duration-300'
                      }`}
                  >
                    Descobrir Agora
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500">
                  Seus dados estão seguros e são usados apenas para validação
                </p>
              </div>
            </motion.div>
          )}

          {stage === 'validating' && (
            <motion.div
              key="validating"
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary/20"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <Loader2 className="w-12 h-12 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Validando seus dados
              </h3>
              <p className="text-gray-600">
                Aguarde enquanto verificamos seu perfil...
              </p>
            </motion.div>
          )}

          {stage === 'calculating' && (
            <motion.div
              key="calculating"
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary/20"
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary"
                  style={{
                    clipPath: `inset(0 ${100 - progress}% 0 0)`
                  }}
                />
                <motion.div
                  className="absolute inset-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Star className="w-12 h-12 text-white" />
                </motion.div>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Calculando seu potencial
              </h3>
              <p className="text-gray-600">
                Analisando oportunidades disponíveis...
              </p>
              <motion.div
                className="mt-4 text-lg font-semibold text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {progress}% concluído
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};