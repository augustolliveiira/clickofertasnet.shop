import { RewardLevel } from '../types';

export const rewardLevels: RewardLevel[] = [
  {
    name: "BRONZE",
    minValue: 150,
    maxValue: 399.99,
    color: "#CD7F32",
    description: "Nível inicial com alto potencial de crescimento! 🌱"
  },
  {
    name: "PRATA",
    minValue: 400,
    maxValue: 799.99,
    color: "#C0C0C0",
    description: "Perfil promissor com excelente potencial! ⚡"
  },
  {
    name: "OURO",
    minValue: 800,
    maxValue: 1199.99,
    color: "#FF5F00",
    description: "Usuário excepcional com alto engajamento! 🌟"
  },
  {
    name: "DIAMANTE",
    minValue: 1200,
    maxValue: 1548.00,
    color: "#FF4500",
    description: "Perfil perfeito para recompensas máximas! 💎"
  }
];