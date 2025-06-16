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
              <Trophy className="w-4 h-4" style={{ color: '#FF7A00' }} />
              <span className="text-sm font-medium" style={{ color: '#212121' }}>
                Avaliação em andamento
              </span>
            </div>
            {points > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 px-2 py-1 rounded-full border"
                style={{ 
                  background: 'linear-gradient(to right, rgba(29, 185, 84, 0.1), rgba(29, 185, 84, 0.1))',
                  borderColor: '#1DB954'
                }}
              >
                <Star className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-xs font-bold" style={{ color: '#1DB954' }}>
                  {totalPoints} pontos
                </span>
              </motion.div>
            )}
          </>
        )}
      </div>
      <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: '#F7F8FA' }}>
        <motion.div
          className="h-full relative"
          style={{ background: 'linear-gradient(to right, #FF7A00, #FF7A00)' }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)' }}
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