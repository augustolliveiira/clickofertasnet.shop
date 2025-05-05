import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gift, Wallet, Clock, Star, ArrowRight, Sparkles } from 'lucide-react';
import { RewardLevel } from '../types';

const benefits = [
  {
    icon: Trophy,
    title: 'Recompensa Garantida',
    description: 'Saque aprovado automaticamente'
  },
  {
    icon: Gift,
    title: 'Bônus Especial',
    description: 'Ganhe mais por indicações'
  },
  {
    icon: Wallet,
    title: 'Saque Rápido',
    description: 'Dinheiro na conta em até 24h'
  },
  {
    icon: Clock,
    title: 'Suporte 24/7',
    description: 'Assistência completa'
  }
];

interface CompletionScreenProps {
  balance: number;
  currentLevel: RewardLevel;
  onComplete: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ 
  balance, 
  currentLevel,
  onComplete 
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-6 max-w-md w-full text-center relative z-10"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src="https://logospng.org/download/kwai/logo-kwai-4096.png" 
        alt="Kwai" 
        className="h-20 mx-auto mb-6"
      />

      <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-orange-800">
            Programa Verificado Kwai
          </h3>
        </div>
        <p className="text-sm text-orange-700">
          Seu saque está garantido pela plataforma oficial
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <motion.div 
          className="coin w-16 h-16"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <div className="absolute inset-0 animate-coin-shine"></div>
        </motion.div>
        
        <div className="flex-1 text-left">
          <motion.h1 
            className="text-2xl font-bold text-gray-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Parabéns! 🎉
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Seu perfil foi classificado como
            <span 
              className="font-semibold ml-1"
              style={{ color: currentLevel.color }}
            >
              {currentLevel.name}
            </span>
          </motion.p>
        </div>
      </div>

      <motion.div
        className="text-4xl font-bold text-[#FFB800] mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {formatCurrency(balance)}
      </motion.div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl mb-6">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-green-200">
          <span className="text-sm font-medium text-green-800">Status do Saque</span>
          <span className="text-sm bg-green-500 text-white px-2 py-0.5 rounded-full">
            Disponível
          </span>
        </div>
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-green-200">
          <span className="text-sm font-medium text-green-800">Tempo para Saque</span>
          <span className="text-sm text-green-700">24 horas</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-green-800">Garantia Kwai</span>
          <span className="text-sm text-green-700">Ativa</span>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-2 gap-3 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={index}
              className="p-3 rounded-xl bg-white/80 text-gray-800 hover:bg-[#FFB800] hover:text-white transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Icon className="w-6 h-6 mx-auto mb-2 text-[#FFB800] group-hover:text-white transition-colors" />
              <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
              <p className="text-xs text-gray-600 group-hover:text-white/90 transition-colors">
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          onClick={onComplete}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#FFB800] to-[#FFD100] text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Receber Agora
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.div 
          className="absolute -right-3 -top-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Star className="w-5 h-5 text-[#FFB800]" />
        </motion.div>
      </motion.div>

      <p className="mt-4 text-sm text-gray-500">
        Programa oficial de recompensas patrocinado pelo Kwai
      </p>
    </motion.div>
  );
};