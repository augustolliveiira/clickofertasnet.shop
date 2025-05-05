import React from 'react';
import { motion } from 'framer-motion';
import { RewardLevel } from '../types';

interface RewardLevelBadgeProps {
  level: RewardLevel;
  isActive?: boolean;
  showValue?: boolean;
}

export const RewardLevelBadge: React.FC<RewardLevelBadgeProps> = ({ 
  level, 
  isActive = false,
  showValue = false
}) => {
  return (
    <motion.div
      className={`
        relative px-2 py-1 rounded-full font-bold text-[10px] flex-shrink-0
        transition-all duration-300 cursor-default
        ${isActive ? 'scale-110 shadow-lg' : 'opacity-75 hover:opacity-100'}
      `}
      style={{
        backgroundColor: `${level.color}30`,
        border: `2px solid ${level.color}`,
        boxShadow: isActive ? `0 0 15px ${level.color}50` : 'none'
      }}
      whileHover={{ scale: isActive ? 1.15 : 1.05 }}
      animate={isActive ? {
        y: [0, -2, 0],
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }
      } : {}}
    >
      <div 
        className="relative z-10 whitespace-nowrap"
        style={{ 
          color: level.color,
          textShadow: `0 0 8px ${level.color}40`
        }}
      >
        {level.name}
      </div>
      
      {isActive && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ 
              border: `2px solid ${level.color}`,
              opacity: 0.5
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at center, ${level.color}20 0%, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </motion.div>
  );
};