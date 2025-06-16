import React from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Star } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  balance: number;
  remainingQuestions: number;
  totalQuestions: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  balance,
  remainingQuestions,
  totalQuestions
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <motion.div
      className="rounded-xl p-4 shadow-sm"
      style={{ 
        background: 'linear-gradient(to bottom right, #F7F8FA, #F7F8FA)'
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #FF7A00, #FF7A00)' }}>
          <User className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold" style={{ color: '#212121' }}>
              {name.split(' ')[0]}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" style={{ color: '#FF7A00' }} />
              <span className="text-sm" style={{ color: '#666666' }}>
                {remainingQuestions} de {totalQuestions} avaliações
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <DollarSign className="w-4 h-4" style={{ color: '#FF7A00' }} />
            <span className="font-semibold" style={{ color: '#FF7A00' }}>
              {formatCurrency(balance)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};