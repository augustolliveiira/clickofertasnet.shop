import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Shield, Clock, CheckCircle2 } from 'lucide-react';

interface FailureScreenProps {
  onContinue: () => void;
}

export const FailureScreen: React.FC<FailureScreenProps> = ({ onContinue }) => {
  const handleUnlock = () => {
    // Captura todos os parâmetros da URL atual
    const params = new URLSearchParams(window.location.search);
    
    // Lista de parâmetros UTM e de tracking que devem ser preservados
    const trackingParams = [
      'utm_source',
      'utm_medium', 
      'utm_campaign',
      'utm_term',
      'utm_content',
      'utm_id',
      'click_id',
      'clickid',
      'user',
      'fbclid',
      'gclid',
      'ttclid',
      'msclkid',
      'twclid',
      'li_fat_id',
      'igshid',
      'src',
      'ref',
      'referrer',
      'affiliate_id',
      'partner_id',
      'campaign_id',
      'ad_id',
      'adset_id',
      'creative_id',
      'keyword',
      'placement',
      'network',
      'device',
      'audience',
      'interest',
      'age',
      'gender',
      'location'
    ];

    // Constrói a string de parâmetros preservando todos os valores
    const utmString = trackingParams
      .map(param => {
        const value = params.get(param);
        return value ? `${param}=${encodeURIComponent(value)}` : null;
      })
      .filter(Boolean)
      .join('&');

    // URL base do checkout
    const baseUrl = 'https://pay.realizar-pagamento.com/checkout/e552c759-d945-44a6-b0a8-2fcbc823b442';
    
    // Constrói a URL final com todos os parâmetros
    const redirectUrl = `${baseUrl}${utmString ? '?' + utmString : ''}`;

    console.log('Redirecting to checkout with UTMs:', redirectUrl);
    
    // Redireciona para o checkout
    window.location.href = redirectUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800] via-[#FF8500] to-[#FF6B00]">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      <motion.div 
        className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-md w-full relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-6">
          <motion.div 
            className="relative w-24 h-24 mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            {/* Lock animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#FFB800] to-[#FF8500] rounded-2xl flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Lock className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 bg-[#FFB800] rounded-2xl"
              initial={{ scale: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800">Taxa de Segurança</h2>
            <p className="text-gray-500">
              Para garantir a segurança do seu saque e validar sua conta na plataforma Cupom Premiado, é necessário pagar uma taxa única de segurança.
            </p>
            <div className="bg-[#FFB800]/5 p-4 rounded-lg border border-[#FFB800]/20">
              <p className="text-sm text-[#FF8500]/90">
                Esta taxa é uma medida de segurança para:
              </p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#FF8500]/70">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Validar sua identidade
                </li>
                <li className="flex items-center gap-2 text-sm text-[#FF8500]/70">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Prevenir fraudes e abusos
                </li>
                <li className="flex items-center gap-2 text-sm text-[#FF8500]/70">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Garantir a legitimidade do saque
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="text-sm text-green-600">
                O valor da taxa será totalmente reembolsado junto com seu saque após a validação
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFB800] to-[#FF8500] rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">Segurança</h4>
              <p className="text-xs text-gray-600 leading-tight">Proteção garantida</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFB800] to-[#FF8500] rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">Rápido</h4>
              <p className="text-xs text-gray-600 leading-tight">Liberação em 10min</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFB800] to-[#FF8500] rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">Garantido</h4>
              <p className="text-xs text-gray-600 leading-tight">100% seguro</p>
            </div>
          </motion.div>

          <motion.button
            onClick={handleUnlock}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#FFB800] to-[#FF8500] text-white rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mb-6"
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
            className="bg-gradient-to-r from-[#FFB800]/10 to-[#FF8500]/10 p-4 rounded-lg border border-[#FFB800]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm font-medium text-[#FF8500]/90">
              Após o pagamento da taxa, seu saque será liberado automaticamente
            </p>
          </motion.div>

          <div className="w-full h-[1px] bg-gray-200 my-4"></div>

          <motion.p
            className="text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Ao prosseguir com o pagamento da taxa, você concorda com nossos <span className="font-semibold">Termos</span> e <span className="font-semibold">Condições</span>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};