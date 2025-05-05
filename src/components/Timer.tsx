import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimerProps {
  duration: number;
  onComplete: () => void;
  variant?: 'default' | 'large' | 'warning';
}

export const Timer: React.FC<TimerProps> = ({ duration, onComplete, variant = 'default' }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    if (timeLeft <= 60 && !isWarning) {
      setIsWarning(true);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete, isWarning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const variants = {
    default: "text-gray-600",
    large: "text-2xl font-bold",
    warning: "text-red-500 font-bold"
  };

  const pulseAnimation = isWarning ? {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
    }
  } : {};

  return (
    <motion.div 
      className={`flex items-center gap-2 ${variants[variant]} ${isWarning ? 'text-red-500' : ''}`}
      animate={pulseAnimation}
    >
      <Clock className={`${variant === 'large' ? 'w-6 h-6' : 'w-5 h-5'}`} />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      {isWarning && variant !== 'default' && (
        <span className="text-sm font-normal ml-2 animate-pulse">
          Tempo limitado!
        </span>
      )}
    </motion.div>
  );
};