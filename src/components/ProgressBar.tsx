import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
  showValue?: boolean;
  points?: number;
  totalPoints?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  showValue = true,
  points = 0,
  totalPoints = 0
}) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        {showValue && (
          <>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#FFB800]" />
              <span className="text-sm font-medium text-gray-700">
                Avaliação em andamento
              </span>
            </div>
            {points > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 bg-gradient-to-r from-green-50 to-emerald-50 px-2 py-1 rounded-full border border-green-100"
              >
                <Star className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-xs font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  {totalPoints} pontos
                </span>
              </motion.div>
            )}
          </>
        )}
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FFD100] to-[#FFB800] relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};