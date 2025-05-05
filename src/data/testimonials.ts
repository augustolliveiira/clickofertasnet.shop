import { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "João R.",
    message: "Recebi em 3 minutos no meu pix, obrigado Rewards!",
    date: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80"
  },
  {
    id: 2,
    name: "Camila D.",
    message: "Vi um vídeo passando, achei que era mentira, confiei e recebi no meu pix em menos de 10 minutos, salvou demais…",
    date: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 minutes ago
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
  },
  {
    id: 3,
    name: "Pedro M.",
    message: "Já avaliei 2 vezes, recebendo certinho galera, obrigado Rewards",
    date: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    avatar: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=100&q=80"
  },
  {
    id: 4,
    name: "Ana S.",
    message: "Avaliei achando que era mentira, mas recebi aqui, será que posso avaliar de novo?",
    date: new Date(Date.now() - 55 * 60 * 1000).toISOString(), // 55 minutes ago
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
  }
];