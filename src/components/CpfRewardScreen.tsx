import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gift, Wallet, Clock, Star, ArrowRight, Sparkles, Shield, Check, DollarSign, Bell, Award, User } from 'lucide-react';

interface CpfRewardScreenProps {
  balance: number;
  cpfData: {
    nome: string;
    cpf: string;
    evaluations: number;
    minValue: number;
    maxValue: number;
  };
  onContinue: () => void;
}

export const CpfRewardScreen: React.FC<CpfRewardScreenProps> = ({ 
  balance, 
  cpfData,
  onContinue 
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCPF = (cpf: string) => {
    return cpf
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const achievements = [
    {
      icon: User,
      title: "Perfil Verificado",
      description: `${cpfData.nome} - CPF validado automaticamente`
    },
    {
      icon: Trophy,
      title: "Avaliações Concluídas",
      description: `${cpfData.evaluations} avaliações realizadas com sucesso`
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
        <h1 className="text-3xl font-bold" style={{ color: '#FF7A00' }}>Respostas Premiadas</h1>
      </div>

      <div className="rounded-xl p-4 mb-6" style={{ background: 'linear-gradient(to right, rgba(255, 122, 0, 0.1), rgba(255, 122, 0, 0.1))' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" style={{ color: '#FF7A00' }} />
          <h3 className="font-semibold" style={{ color: '#FF7A00' }}>
            Programa Verificado Respostas Premiadas
          </h3>
        </div>
        <p className="text-sm" style={{ color: '#FF7A00' }}>
          Seu saque está garantido pela plataforma oficial
        </p>
      </div>

      {/* Header com dados do usuário validado */}
      <motion.div
        className="rounded-xl p-4 mb-6 border"
        style={{ 
          background: 'linear-gradient(to right, rgba(29, 185, 84, 0.1), rgba(29, 185, 84, 0.1))',
          borderColor: '#1DB954'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1DB954' }}>
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold" style={{ color: '#1DB954' }}>
              {cpfData.nome}
            </h3>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: '#1DB954' }} />
              <span className="text-sm" style={{ color: '#1DB954' }}>Conta Verificada</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium" style={{ color: '#1DB954' }}>
                {cpfData.evaluations} avaliações
              </span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <div className="flex items-center justify-between text-sm mb-2">
            <span style={{ color: '#1DB954' }}>CPF:</span>
            <span className="font-semibold" style={{ color: '#1DB954' }}>
              {formatCPF(cpfData.cpf)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: '#1DB954' }}>Faixa de recompensa:</span>
            <span className="font-semibold" style={{ color: '#1DB954' }}>
              {formatCurrency(cpfData.minValue)} - {formatCurrency(1548.00)}
            </span>
          </div>
        </div>
      </motion.div>

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
            className="text-2xl font-bold"
            style={{ color: '#212121' }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Parabéns, {cpfData.nome.split(' ')[0]}! 🎉
          </motion.h1>
          <motion.p 
            style={{ color: '#666666' }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Suas avaliações foram concluídas com sucesso
          </motion.p>
        </div>
      </div>

      <motion.div
        className="text-4xl font-bold mb-6"
        style={{ color: '#FF7A00' }}
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
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ background: 'rgba(255, 122, 0, 0.05)' }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255, 122, 0, 0.1)' }}>
                <Icon className="w-5 h-5" style={{ color: '#FF7A00' }} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium" style={{ color: '#212121' }}>{achievement.title}</h4>
                <p className="text-sm" style={{ color: '#666666' }}>{achievement.description}</p>
              </div>
              <Check className="w-5 h-5" style={{ color: '#1DB954' }} />
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
              className="p-3 rounded-xl text-center"
              style={{ background: 'linear-gradient(to bottom right, rgba(255, 122, 0, 0.05), rgba(255, 122, 0, 0.1))' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon className="w-5 h-5" style={{ color: '#FF7A00' }} />
              </div>
              <h4 className="font-medium text-sm mb-1" style={{ color: '#FF7A00' }}>{benefit.title}</h4>
              <p className="text-xs" style={{ color: '#FF7A00' }}>{benefit.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl mb-6" style={{ background: 'linear-gradient(to bottom right, rgba(29, 185, 84, 0.1), rgba(29, 185, 84, 0.1))' }}>
        <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: '#1DB954' }}>
          <span className="text-sm font-medium" style={{ color: '#1DB954' }}>Status do Saque</span>
          <span className="text-sm text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: '#1DB954' }}>
            Disponível
          </span>
        </div>
        <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: '#1DB954' }}>
          <span className="text-sm font-medium" style={{ color: '#1DB954' }}>Tempo para Saque</span>
          <span className="text-sm" style={{ color: '#1DB954' }}>24 horas</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: '#1DB954' }}>Garantia Respostas Premiadas</span>
          <span className="text-sm" style={{ color: '#1DB954' }}>Ativa</span>
        </div>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 px-6 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
        style={{ background: 'linear-gradient(to right, #FF7A00, #FF7A00)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Receber Agora
        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <p className="mt-4 text-sm" style={{ color: '#666666' }}>
        Programa oficial de recompensas patrocinado pelo Respostas Premiadas
      </p>
    </motion.div>
  );
};