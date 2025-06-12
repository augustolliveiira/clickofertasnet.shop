import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gift, Wallet, Clock, Star, ArrowRight, Sparkles, Shield, Check, DollarSign, Bell, Award } from 'lucide-react';

interface RewardScreenProps {
  balance: number;
  userName: string;
  evaluations: number;
  onContinue: () => void;
}

export const RewardScreen: React.FC<RewardScreenProps> = ({ 
  balance, 
  userName,
  evaluations,
  onContinue 
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const achievements = [
    {
      icon: Trophy,
      title: "Avaliações Concluídas",
      description: `${evaluations} avaliações realizadas com sucesso`
    },
    {
      icon: Star,
      title: "Perfil Verificado",
      description: "Sua conta foi validada automaticamente"
    },
    {
      icon: Award,
      title: "Recompensa Liberada",
      description: "Saque disponível para retirada imediata"
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Saque Rápido",
      description: "Receba em até 24h"
    },
    {
      icon: Bell,
      title: "Notificações",
      description: "Acompanhe seu pagamento"
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Garantia de pagamento"
    }
  ];

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-6 max-w-md w-full text-center relative z-10"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-20 flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold text-[#FFB800]">Cupom Premiado</h1>
      </div>

      <div className="bg-gradient-to-r from-[#FFB800]/10 to-[#FF8500]/10 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#FFB800]" />
          <h3 className="font-semibold text-[#FF8500]">
            Programa Verificado Cupom Premiado
          </h3>
        </div>
        <p className="text-sm text-[#FF8500]">
          Seu saque está garantido pela plataforma oficial
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
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
            Parabéns, {userName.split(' ')[0]}! 🎉
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Suas avaliações foram concluídas com sucesso
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

      <div className="space-y-4 mb-6">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={index}
              className="flex items-center gap-3 bg-[#FFB800]/5 p-3 rounded-lg"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="w-10 h-10 bg-[#FFB800]/10 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#FFB800]" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              <Check className="w-5 h-5 text-green-500" />
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#FFB800]/5 to-[#FF8500]/10 p-3 rounded-xl text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon className="w-5 h-5 text-[#FFB800]" />
              </div>
              <h4 className="font-medium text-[#FF8500] text-sm mb-1">{benefit.title}</h4>
              <p className="text-xs text-[#FF8500]">{benefit.description}</p>
            </motion.div>
          );
        })}
      </div>

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
          <span className="text-sm font-medium text-green-800">Garantia Cupom Premiado</span>
          <span className="text-sm text-green-700">Ativa</span>
        </div>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 px-6 bg-gradient-to-r from-[#FFB800] to-[#FF8500] text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Receber Agora
        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <p className="mt-4 text-sm text-gray-500">
        Programa oficial de recompensas patrocinado pelo Cupom Premiado
      </p>
    </motion.div>
  );
};