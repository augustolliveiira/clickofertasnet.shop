import { RewardLevel } from '../types';

export const rewardLevels: RewardLevel[] = [
  {
    name: "BRONZE",
    minValue: 150,
    maxValue: 299.99,
    color: "#CD7F32",
    description: "Nível inicial com alto potencial de crescimento! 🌱"
  },
  {
    name: "PRATA",
    minValue: 300,
    maxValue: 499.99,
    color: "#C0C0C0",
    description: "Perfil promissor com excelente potencial! ⚡"
  },
  {
    name: "OURO",
    minValue: 500,
    maxValue: 699.99,
    color: "#FF5F00",
    description: "Usuário excepcional com alto engajamento! 🌟"
  },
  {
    name: "DIAMANTE",
    minValue: 700,
    maxValue: 967.32,
    color: "#FF4500",
    description: "Perfil perfeito para recompensas máximas! 💎"
  }
];