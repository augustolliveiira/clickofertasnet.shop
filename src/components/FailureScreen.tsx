import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Shield, Clock, CheckCircle2, AlertTriangle, DollarSign, Star, Zap } from 'lucide-react';

interface FailureScreenProps {
  onContinue: () => void;
}

export const FailureScreen: React.FC<FailureScreenProps> = ({ onContinue }) => {
  // Simula o valor que o usuário ganhou (pode vir como prop)
  const valorGanho = 1548.00;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

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

    // URL base do checkout - ATUALIZADA PARA PERFECT PAY
    const baseUrl = 'https://go.perfectpay.com.br/PPU38CPQPMG';
    
    // Constrói a URL final com todos os parâmetros
    const redirectUrl = `${baseUrl}${utmString ? '?' + utmString : ''}`;

    console.log('Redirecting to Perfect Pay checkout with UTMs:', redirectUrl);
    
    // Redireciona para o checkout
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
        {/* ÍCONE PRINCIPAL COM ANIMAÇÃO MELHORADA */}
        <motion.div 
          className="relative w-20 h-20 mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <motion.div 
            className="absolute inset-0 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(to bottom right, #FF7A00, #FF7A00)' }}
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
            <Lock className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ backgroundColor: '#FF7A00' }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>
        
        {/* TÍTULO PRINCIPAL COM VALOR PERSONALIZADO */}
        <motion.div
          className="space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold leading-tight" style={{ color: '#212121' }}>
            Você acabou de gerar{' '}
            <span className="text-3xl font-black" style={{ color: '#FF7A00' }}>
              {formatCurrency(valorGanho)}
            </span>
          </h2>
          <p className="text-lg font-semibold" style={{ color: '#212121' }}>
            — só falta confirmar que é você para receber agora
          </p>
        </motion.div>
        
        {/* SUBTÍTULO EXPLICATIVO */}
        <motion.div
          className="space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="leading-relaxed" style={{ color: '#212121' }}>
            Por segurança, precisamos confirmar que você é uma pessoa real (e não um bot).
          </p>
          <p style={{ color: '#666666' }}>
            A verificação é instantânea e seu saque é liberado logo em seguida.
          </p>
        </motion.div>

        {/* SELOS DE SEGURANÇA REESTRUTURADOS */}
        <motion.div
          className="grid grid-cols-1 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 p-3 rounded-xl border" style={{ backgroundColor: '#1DB954', borderColor: '#1DB954' }}>
            <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
            <span className="text-white font-medium">Conta verificada pelo sistema</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border" style={{ backgroundColor: '#1A2E44', borderColor: '#1A2E44' }}>
            <Shield className="w-6 h-6 text-white flex-shrink-0" />
            <span className="text-white font-medium">Transação protegida com criptografia</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border" style={{ backgroundColor: '#FF7A00', borderColor: '#FF7A00' }}>
            <Zap className="w-6 h-6 text-white flex-shrink-0" />
            <span className="text-white font-medium">Dinheiro liberado em até 3 minutos</span>
          </div>
        </motion.div>

        {/* TEXTO DE PERSUASÃO */}
        <motion.div 
          className="p-4 rounded-xl border"
          style={{ 
            background: 'linear-gradient(to right, rgba(255, 122, 0, 0.1), rgba(255, 122, 0, 0.1))',
            borderColor: '#FF7A00'
          }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#212121' }}>
            Mais de <span className="font-bold">17.000 pessoas</span> já sacaram entre{' '}
            <span className="font-bold" style={{ color: '#1DB954' }}>R$117</span> e{' '}
            <span className="font-bold" style={{ color: '#1DB954' }}>R$1.097</span> usando esse mesmo sistema — e todas passaram por essa etapa.
          </p>
          <p className="text-sm" style={{ color: '#666666' }}>
            Esse passo protege o sistema de fraudes e garante que o valor vá direto pra sua chave PIX.
          </p>
        </motion.div>

        {/* GARANTIA DE REEMBOLSO */}
        <motion.div 
          className="p-4 rounded-xl border-2"
          style={{ 
            background: 'linear-gradient(to right, rgba(29, 185, 84, 0.1), rgba(29, 185, 84, 0.1))',
            borderColor: '#1DB954'
          }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1DB954' }}>
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm" style={{ color: '#1DB954' }}>
                📌 A verificação tem custo simbólico — 100% reembolsável junto com seu saque.
              </p>
            </div>
          </div>
        </motion.div>

        {/* PROVA SOCIAL COM FOTO ATUALIZADA */}
        <motion.div 
          className="p-4 rounded-xl border"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderColor: '#1A2E44'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-start gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdCy35z_NzHu34apsqV_yLbSnur9sGP4J2Ag&s"
              alt="Caio M."
              className="w-12 h-12 rounded-full object-cover border-2"
              style={{ borderColor: '#FF7A00' }}
            />
            <div className="flex-1">
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <p className="text-sm italic" style={{ color: '#212121' }}>
                "Eu achei que era enrolação… fiz a verificação e caiu o dinheiro na hora. R$289 direto no Pix!"
              </p>
              <p className="text-xs mt-1 font-medium" style={{ color: '#666666' }}>
                — Caio M., São Paulo/SP
              </p>
            </div>
          </div>
        </motion.div>

        {/* URGÊNCIA */}
        <motion.div 
          className="p-3 rounded-lg border"
          style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgb(239, 68, 68)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-2 justify-center">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-700 font-medium">
              ⚠️ Se você sair dessa página, o valor gerado será cancelado automaticamente.
            </p>
          </div>
        </motion.div>

        {/* BOTÃO PRINCIPAL COM DEGRADÊ */}
        <motion.button
          onClick={handleUnlock}
          className="w-full py-4 px-6 text-white rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          style={{ 
            background: 'linear-gradient(135deg, #FF7A00 0%, #FFB800 100%)',
            boxShadow: '0 8px 32px rgba(255, 122, 0, 0.4)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🔓 SIM, QUERO DESBLOQUEAR E RECEBER AGORA
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* INFORMAÇÃO FINAL */}
        <motion.p
          className="text-xs"
          style={{ color: '#666666' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Verificação instantânea • Saque liberado automaticamente
        </motion.p>
      </div>
    </motion.div>
  );
};