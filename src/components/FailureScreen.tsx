import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface FailureScreenProps {
  onContinue: () => void;
}

export const FailureScreen: React.FC<FailureScreenProps> = ({ onContinue }) => {
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

    const baseUrl = 'https://go.perfectpay.com.br/PPU38CPPNMF';
    const redirectUrl = `${baseUrl}${utmString ? '?' + utmString : ''}`;

    window.location.href = redirectUrl;
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-md w-full relative z-10"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-6">
        <motion.div 
          className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <AlertTriangle className="w-10 h-10 text-primary" />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Taxa de Saque</h2>
          <p className="text-gray-500 mb-4">
            Para realizar seu primeiro saque na plataforma Cupom Premiado, é necessário pagar uma taxa de saque única. 
            Essa taxa é aplicada para prevenir tentativas que violem as regras da atividade.
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-800">Tempo de Recebimento</span>
            <span className="text-sm text-purple-700">10 minutos</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-purple-800">Status</span>
            <span className="text-sm bg-green-500 text-white px-2 py-0.5 rounded-full">
              Disponível
            </span>
          </div>
        </motion.div>

        <motion.button
          onClick={handleUnlock}
          className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          DESBLOQUEAR AGORA
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

        <motion.div
          className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm font-medium text-purple-800">
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
  );
};