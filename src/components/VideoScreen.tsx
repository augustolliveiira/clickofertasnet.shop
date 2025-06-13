import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UnlockKeyhole, DollarSign } from 'lucide-react';

interface VideoScreenProps {
  balance: number;
  onComplete: () => void;
}

export const VideoScreen: React.FC<VideoScreenProps> = ({ balance, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(40); // 40 segundos
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // First load the SDK script
    const sdkScript = document.createElement('script');
    sdkScript.src = 'https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js';
    sdkScript.setAttribute('data-id', '6801bf81275d8c3fa5d21fb9');
    sdkScript.async = true;
    
    // Load the player script after SDK is loaded
    sdkScript.onload = () => {
      const playerScript = document.createElement('script');
      playerScript.type = 'text/javascript';
      playerScript.id = 'scr_6801bf81275d8c3fa5d21fb9';
      playerScript.innerHTML = `
        var s=document.createElement("script"); 
        s.src="https://scripts.converteai.net/0335ec20-c9d4-4221-a36e-428ccf9162ce/players/6801bf81275d8c3fa5d21fb9/player.js", 
        s.async=!0,
        document.head.appendChild(s);
      `;
      document.head.appendChild(playerScript);
    };
    
    document.head.appendChild(sdkScript);

    return () => {
      // Cleanup scripts when component unmounts
      const existingSdkScript = document.querySelector('script[data-id="6801bf81275d8c3fa5d21fb9"]');
      if (existingSdkScript) {
        document.head.removeChild(existingSdkScript);
      }
      
      const existingPlayerScript = document.getElementById('scr_6801bf81275d8c3fa5d21fb9');
      if (existingPlayerScript) {
        document.head.removeChild(existingPlayerScript);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowButton(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-[#FF6B00]">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      <motion.div 
        className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-md w-full relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-primary to-secondary p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-white text-lg font-bold">
                  CUPOM PREMIADO
                </h1>
                <p className="text-white/80 text-sm">
                  Saldo Disponível
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(balance)}
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">
            DESBLOQUEIO DE SAQUE
          </h2>
          
          <p className="text-gray-600 text-sm mb-6">
            Veja como liberar seu saque assistindo a esse rápido vídeo:
          </p>

          <div className="relative mb-6 rounded-xl overflow-hidden">
            <div 
              id="vid_6801bf81275d8c3fa5d21fb9" 
              style={{ 
                position: 'relative', 
                width: '100%', 
                padding: '177.77777777777777% 0 0' 
              }}
            >
              <img 
                id="thumb_6801bf81275d8c3fa5d21fb9" 
                src="https://images.converteai.net/0335ec20-c9d4-4221-a36e-428ccf9162ce/players/6801bf81275d8c3fa5d21fb9/thumbnail.jpg" 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  display: 'block' 
                }} 
                alt="thumbnail" 
              />
              <div 
                id="backdrop_6801bf81275d8c3fa5d21fb9" 
                style={{ 
                  WebkitBackdropFilter: 'blur(5px)', 
                  backdropFilter: 'blur(5px)', 
                  position: 'absolute', 
                  top: 0, 
                  height: '100%', 
                  width: '100%' 
                }}
              ></div>
            </div>
          </div>

          {showButton && (
            <motion.button
              onClick={onComplete}
              className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UnlockKeyhole className="w-6 h-6" />
              CONTINUAR AVALIAÇÃO
            </motion.button>
          )}

          <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

          <motion.div
            className="bg-gradient-to-r from-[#FFB800]/10 to-[#FF8500]/10 p-4 rounded-lg border border-[#FFB800]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm font-medium text-[#FF8500]">
              Concorra a um bônus adicional
            </p>
          </motion.div>

          <div className="w-full h-[1px] bg-gray-200 my-4"></div>

          <motion.p
            className="text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Ao participar das atividades de recompensa, você concorda com nossos <span className="font-semibold">Termos</span> e <span className="font-semibold">Condições</span>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};