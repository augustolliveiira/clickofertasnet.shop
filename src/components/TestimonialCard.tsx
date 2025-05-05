import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ThumbsUp } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  delay?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const timeAgo = formatDistanceToNow(new Date(testimonial.date), {
    addSuffix: true,
    locale: ptBR
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg p-4 hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-start gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="w-4 h-4 fill-current text-[#00A877]" 
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{timeAgo}</span>
              </div>
            </div>
            <button className="text-[#00A877] hover:text-[#008C64] transition-colors">
              <ThumbsUp className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-700 mt-2 text-sm leading-relaxed">
            {testimonial.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
};