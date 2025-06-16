import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnlockKeyhole, DollarSign, Star, Zap, Gift, Trophy, X, Sparkles, Plus } from 'lucide-react';

interface VideoScreenProps {
  balance: number;
  onComplete: () => void;
}

export const VideoScreen: React.FC<VideoScreenProps> = ({ balance, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(75); // 1:15 = 75 segundos
  const [showButton, setShowButton] = useState(false);
  const [showExtraQuestionsPopup, setShowExtraQuestionsPopup] = useState(false);
  const [popupCountdown, setPopupCountdown] = useState(3); // 3 segundos de countdown

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

  // Countdown do popup - quando chega a 0, vai para as próximas avaliações
  useEffect(() => {
    if (showExtraQuestionsPopup && popupCountdown > 0) {
      const timer = setInterval(() => {
        setPopupCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Quando countdown chega a 0, vai para as próximas avaliações
            setShowExtraQuestionsPopup(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showExtraQuestionsPopup, popupCountdown, onComplete]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleContinueClick = () => {
    // Abre o popup e reseta o countdown para 3 segundos
    setShowExtraQuestionsPopup(true);
    setPopupCountdown(3);
  };

  return (
    <>
      <motion.div 
        className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-md w-full relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-between mb-6 p-4 rounded-xl shadow-lg" style={{ background: 'linear-gradient(to right, #FF7A00, #FF7A00)' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-white text-lg font-bold">
                  RESPOSTAS PREMIADAS
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

          {/* HEADLINE COM GATILHOS */}
          <motion.div
            className="mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Ícone de destaque */}
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center relative"
                style={{ backgroundColor: '#FF7A00' }}
              >
                <Zap className="w-8 h-8 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: '#FF7A00' }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>

            {/* Headline principal */}
            <motion.h2 
              className="text-4xl font-black mb-3 leading-tight"
              style={{ 
                color: '#FF7A00',
                textShadow: '0 0 20px rgba(255, 122, 0, 0.5)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              O MÉTODO R²
            </motion.h2>

            {/* Badge de destaque */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ 
                backgroundColor: '#FF7A00',
                boxShadow: '0 0 20px rgba(255, 122, 0, 0.4)'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <Star className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">MÉTODO EXCLUSIVO</span>
              <Star className="w-4 h-4 text-white" />
            </motion.div>

            {/* Subtítulo com gatilhos */}
            <motion.div
              className="space-y-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p 
                className="text-lg font-semibold leading-relaxed"
                style={{ color: '#212121' }}
              >
                A nova forma de fazer dinheiro só com{' '}
                <span className="font-black" style={{ color: '#FF7A00' }}>RESPOSTAS</span>
              </p>
              
              {/* Gatilhos em destaque */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-2 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { text: "SEM VENDER", icon: "🚫💰" },
                  { text: "SEM APARECER", icon: "🚫📹" },
                  { text: "SEM DEPENDER DE NINGUÉM", icon: "🚫👥" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-bold border-2"
                    style={{ 
                      backgroundColor: '#1DB954',
                      borderColor: '#1DB954',
                      color: 'white'
                    }}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.9 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.text}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

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
              onClick={handleContinueClick}
              className="w-full py-4 px-6 text-white rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(to right, #FF7A00, #FF7A00)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UnlockKeyhole className="w-6 h-6" />
              CONTINUAR AVALIAÇÃO
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* POPUP AUTOMÁTICO DE 3 SEGUNDOS */}
      <AnimatePresence>
        {showExtraQuestionsPopup && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full relative overflow-hidden"
              style={{ 
                height: '40vh',
                maxHeight: '320px',
                minHeight: '280px'
              }}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Efeito de brilho sutil */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  background: 'linear-gradient(45deg, #FF7A00, #1DB954, #FF7A00)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-x 3s ease infinite'
                }}
              />

              {/* Conteúdo compacto */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                
                {/* Header com ícone */}
                <div className="text-center">
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center relative"
                      style={{ backgroundColor: '#FF7A00' }}
                    >
                      <Plus className="w-8 h-8 text-white" />
                      
                      {/* Partículas simples */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: '#1DB954' }}
                          animate={{
                            x: [0, Math.cos(i * 90 * Math.PI / 180) * 25],
                            y: [0, Math.sin(i * 90 * Math.PI / 180) * 25],
                            opacity: [1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Título compacto */}
                  <motion.h2
                    className="text-xl font-black mb-2 leading-tight"
                    style={{ color: '#212121' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    🎉 BÔNUS DESBLOQUEADO!
                  </motion.h2>

                  {/* Mensagem principal */}
                  <motion.p
                    className="mb-4 leading-relaxed"
                    style={{ color: '#666666' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Você ganhou{' '}
                    <span className="font-bold text-xl" style={{ color: '#FF7A00' }}>
                      +4 AVALIAÇÕES EXTRAS
                    </span>{' '}
                    para aumentar seus ganhos!
                  </motion.p>

                  {/* Badge de destaque */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                    style={{ 
                      backgroundColor: '#1DB954',
                      boxShadow: '0 0 15px rgba(29, 185, 84, 0.3)'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm">OPORTUNIDADE EXTRA</span>
                  </motion.div>
                </div>

                {/* CONTADOR AUTOMÁTICO - VISUAL */}
                <motion.div
                  className="text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="mb-4">
                    <motion.div
                      className="text-6xl font-black mb-2"
                      style={{ color: '#FF7A00' }}
                      key={popupCountdown} // Re-anima quando o número muda
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {popupCountdown}
                    </motion.div>
                    <p className="text-sm font-medium" style={{ color: '#666666' }}>
                      Iniciando avaliações extras...
                    </p>
                  </div>

                  {/* Barra de progresso */}
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F7F8FA' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: '#FF7A00' }}
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  </div>
                </motion.div>

                {/* Texto de rodapé compacto */}
                <motion.p
                  className="text-center text-xs mt-2"
                  style={{ color: '#666666' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Mais oportunidades = mais ganhos! 💰
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};