export interface Testimonial {
  id: number;
  name: string;
  message: string;
  date: string;
  avatar: string;
}

export interface RewardLevel {
  name: string;
  minValue: number;
  maxValue: number;
  color: string;
  description: string;
}

export interface Question {
  text: string;
  options: string[];
  icon: string;
  image?: string;
  points: number;
  feedback: string;
}

export interface PixRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  paymentMethod: 'PIX';
  amount: number;
  traceable: boolean;
  items: Array<{
    unitPrice: number;
    title: string;
    quantity: number;
    tangible: boolean;
  }>;
}

export interface PixResponse {
  pixQrCode: string;
  pixCode: string;
  status: string;
  id: string;
}

export interface CpfValidationResponse {
  status: string;
  message: string;
  data?: {
    evaluations?: number;
    minValue?: number;
    maxValue?: number;
    nome?: string;
  };
}