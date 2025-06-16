import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Download, MessageCircle, Sparkles, Trophy, Clock, Shield } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import { FailureScreen } from './FailureScreen';
import { Testimonial } from '../types';

interface IntermediateScreenProps {
  balance: number;
  testimonials: Testimonial[];
}

export const IntermediateScreen: React.FC<IntermediateScreenProps> = ({ 
  balance,
  testimonials 
}) => {
  const [showFailureScreen, setShowFailureScreen] = useState(false);
  const testimonialsSectionRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const scrollToTestimonials = () => {
    testimonialsSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  if (showFailureScreen) {
    return <FailureScreen onContinue={() => setShowFailureScreen(false)} />;
  }

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-md w-full"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="h-28 flex items-center justify-center mb-8">
          <h1 className="text-4xl font-bold text-[#FFB800]">Cupom Premiado</h1>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl p-4 mb-6 w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFB800]" />
              <h3 className="font-semibold text-purple-800">
                Programa Oficial Cupom Premiado
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-green-500 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              <span className="text-xs text-white font-medium">Ativo</span>
            </div>
          </div>
          <p className="text-sm text-purple-700">
            Você está participando de um programa exclusivo e verificado
          </p>
        </div>

        <div className="w-24 h-24 mb-6">
          <img 
            src="https://aofertarelampago.shop/logo.jpeg"
            alt="App Icon"
            className="w-full h-full rounded-[20%] shadow-lg"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Cupom Premiado - Ganhe Avaliando
        </h1>
        
        <p className="text-gray-600 mb-4">Programa Oficial de Recompensas</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>4.8</span>
          </div>
          <span>•</span>
          <span>10M+ downloads</span>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
            <Trophy className="w-6 h-6 text-orange-500 mb-2" />
            <h4 className="font-medium text-orange-800 mb-1">Recompensas Garantidas</h4>
            <p className="text-sm text-orange-600">Pagamentos verificados em até 24h</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
            <Shield className="w-6 h-6 text-orange-500 mb-2" />
            <h4 className="font-medium text-orange-800 mb-1">Suporte Premium</h4>
            <p className="text-sm text-orange-600">Atendimento prioritário</p>
          </div>
        </div>

        <motion.button
          onClick={scrollToTestimonials}
          className="mb-6 py-3 px-6 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 w-full border border-gray-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="w-5 h-5" />
          Ver depoimentos
        </motion.button>

        <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#FFB800] fill-current" strokeWidth={0} />
              <span className="font-medium text-gray-900">4.8</span>
            </div>
            <span className="text-sm text-gray-500">10M+ avaliações</span>
          </div>

          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-3">{rating}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FFB800]" 
                    style={{ 
                      width: rating === 5 ? '85%' : 
                             rating === 4 ? '10%' : 
                             rating === 3 ? '3%' : 
                             rating === 2 ? '1%' : '1%' 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={testimonialsSectionRef} className="w-full space-y-4 mb-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              delay={index * 0.1 + 1.1}
            />
          ))}
        </div>

        <motion.button
          onClick={() => setShowFailureScreen(true)}
          className="w-full py-3 px-6 bg-gradient-to-r from-[#FFB800] to-[#FF8500] text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-5 h-5" />
          Receber Saque Agora
        </motion.button>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Programa oficial de recompensas patrocinado pelo Cupom Premiado
        </p>
      </div>
    </motion.div>
  );
};