import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Clock, Sparkles, Shield, Play } from 'lucide-react';

interface TransitionScreenProps {
  name: string;
  evaluations: number;
  onComplete: () => void;
}

export const TransitionScreen: React.FC<TransitionScreenProps> = ({
  name,
  evaluations,
  onComplete
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-purple-400">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      <motion.div 
        className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-md w-full relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-20 flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Cupom Premiado</h1>
        </div>

        <motion.div
          className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-purple-800">Programa Oficial Cupom Premiado</span>
            </div>
            <div className="flex items-center gap-1 bg-green-500 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              <span className="text-xs text-white font-medium">Ativo</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full mx-auto mb-4 flex items-center justify-center relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Trophy className="w-12 h-12 text-primary" />
            <motion.div
              className="absolute -right-2 -top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Star className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              Olá, {name.split(' ')[0]}!
            </h2>
            
            <motion.div
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Você foi selecionado para {evaluations} avaliações especiais
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-gray-700">Status da Conta</span>
              </div>
              <span className="text-sm bg-green-500 text-white px-2 py-0.5 rounded-full">
                Verificado
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Avaliações Disponíveis</span>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {Array.from({ length: evaluations }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  ))}
                </div>
                <span className="text-gray-700">{evaluations}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Tempo Restante</span>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-4 h-4" />
                <span>24 horas</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={onComplete}
          className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-5 h-5" />
          Iniciar Avaliações
        </motion.button>

        <motion.p
          className="text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Programa oficial de recompensas patrocinado pelo Cupom Premiado
        </motion.p>
      </motion.div>
    </div>
  );
};