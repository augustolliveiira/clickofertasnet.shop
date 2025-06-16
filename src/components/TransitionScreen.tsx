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
      {/* FUNDO COM NOVA PALETA */}
      <div className="absolute inset-0" style={{ backgroundColor: '#F7F8FA' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E44]/10 via-transparent to-[#FF7A00]/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(26,46,68,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,122,0,0.06),transparent_50%)]"></div>
      </div>

      <motion.div 
        className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-md w-full relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-20 flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#FF7A00' }}>Respostas Premiadas</h1>
        </div>

        <motion.div
          className="rounded-xl p-4 mb-6"
          style={{ 
            background: 'linear-gradient(to right, rgba(255, 122, 0, 0.1), rgba(255, 122, 0, 0.1))'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: '#FF7A00' }} />
              <span className="font-semibold" style={{ color: '#FF7A00' }}>Programa Oficial Respostas Premiadas</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: '#1DB954' }}>
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
            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center relative"
            style={{ 
              background: 'linear-gradient(to bottom right, rgba(255, 122, 0, 0.1), rgba(255, 122, 0, 0.1))'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Trophy className="w-12 h-12" style={{ color: '#FF7A00' }} />
            <motion.div
              className="absolute -right-2 -top-2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FF7A00' }}
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
            <h2 className="text-2xl font-bold" style={{ color: '#212121' }}>
              Olá, {name.split(' ')[0]}!
            </h2>
            
            <motion.div
              className="text-lg"
              style={{ color: '#666666' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Você foi selecionado para {evaluations} avaliações especiais
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="rounded-xl p-4 mb-6"
          style={{ 
            background: 'linear-gradient(to bottom right, #F7F8FA, #F7F8FA)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: '#212121' }} />
                <span className="font-medium" style={{ color: '#212121' }}>Status da Conta</span>
              </div>
              <span className="text-sm text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: '#1DB954' }}>
                Verificado
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium" style={{ color: '#212121' }}>Avaliações Disponíveis</span>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {Array.from({ length: evaluations }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#FF7A00' }}
                    />
                  ))}
                </div>
                <span style={{ color: '#212121' }}>{evaluations}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium" style={{ color: '#212121' }}>Tempo Restante</span>
              <div className="flex items-center gap-2" style={{ color: '#212121' }}>
                <Clock className="w-4 h-4" />
                <span>24 horas</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={onComplete}
          className="w-full py-4 px-6 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
          style={{ background: 'linear-gradient(to right, #FF7A00, #FF7A00)' }}
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
          className="text-center text-sm"
          style={{ color: '#666666' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Programa oficial de recompensas patrocinado pelo Respostas Premiadas
        </motion.p>
      </motion.div>
    </div>
  );
};