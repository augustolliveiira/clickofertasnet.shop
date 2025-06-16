import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ChevronRight, Play, Trophy, Gift, Wallet, Clock, Star, ArrowRight, Shield } from 'lucide-react';
import { Howl } from 'howler';
import { questions } from './data/questions';
import { testimonials } from './data/testimonials';
import { rewardLevels } from './data/rewardLevels';
import { Timer } from './components/Timer';
import { TestimonialCard } from './components/TestimonialCard';
import { RewardLevelBadge } from './components/RewardLevelBadge';
import { ProgressBar } from './components/ProgressBar';
import { IntermediateScreen } from './components/IntermediateScreen';
import { PixScreen } from './components/PixScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { CpfValidationScreen } from './components/CpfValidationScreen';
import { TransitionScreen } from './components/TransitionScreen';
import { ProfileCard } from './components/ProfileCard';
import { FailureScreen } from './components/FailureScreen';
import { VideoScreen } from './components/VideoScreen';
import { RewardScreen } from './components/RewardScreen';
import { CpfRewardScreen } from './components/CpfRewardScreen';

const coinSounds = {
  collect: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'],
    volume: 0.4,
    rate: 1.2,
    sprite: {
      start: [0, 800],
      end: [800, 1600]
    }
  }),
  reward: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3'],
    volume: 0.3,
    sprite: {
      short: [0, 600],
      long: [600, 1800]
    }
  }),
  success: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'],
    volume: 0.25,
    rate: 0.95
  }),
  victory: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'],
    volume: 0.5,
    sprite: {
      full: [0, 2000]
    }
  }),
  celebration: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3'],
    volume: 0.4,
    sprite: {
      main: [0, 2500]
    }
  }),
  // NOVO SOM ESPECÍFICO PARA O POPUP
  popup: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'],
    volume: 0.6,
    rate: 1.1
  })
};

const benefits = [
  {
    icon: Trophy,
    title: "Ganhe Recompensas",
    description: "Receba dinheiro respondendo perguntas simples"
  },
  {
    icon: Gift,
    title: "Bônus Diários",
    description: "Volte todos os dias para ganhar mais"
  },
  {
    icon: Wallet,
    title: "Saque Rápido",
    description: "Receba via PIX em até 24 horas"
  },
  {
    icon: Clock,
    title: "Tempo Livre",
    description: "Ganhe dinheiro no seu tempo livre"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [transitionCoins, setTransitionCoins] = useState<number>(0);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showPixScreen, setShowPixScreen] = useState(false);
  const [showIntermediate, setShowIntermediate] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [startingQuiz, setStartingQuiz] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isAnimatingCoins, setIsAnimatingCoins] = useState(false);
  const [currentRewardLevel, setCurrentRewardLevel] = useState(rewardLevels[0]);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showCpfValidation, setShowCpfValidation] = useState(false);
  const [userCpf, setUserCpf] = useState('');
  const [availableEvaluations, setAvailableEvaluations] = useState(6);
  const [rewardRange, setRewardRange] = useState({ min: 150, max: 1548.00 });
  const [showTransition, setShowTransition] = useState(false);
  const [userName, setUserName] = useState('Usuário');
  const [showFailureScreen, setShowFailureScreen] = useState(false);
  const [showVideoScreen, setShowVideoScreen] = useState(false);
  const [showRewardScreen, setShowRewardScreen] = useState(false);
  const [showCpfRewardScreen, setShowCpfRewardScreen] = useState(false);
  const [cpfRewardData, setCpfRewardData] = useState<any>(null);
  const [hasCompletedPix, setHasCompletedPix] = useState(false);
  const [hasCompletedVideo, setHasCompletedVideo] = useState(false);
  const [showBalancePopup, setShowBalancePopup] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      const interval = setInterval(() => {
        setActiveBenefit(prev => (prev + 1) % benefits.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isCompleted]);

  useEffect(() => {
    const newLevel = rewardLevels.find(level => 
      totalPoints >= level.minValue && totalPoints <= level.maxValue
    ) || rewardLevels[0];
    
    setCurrentRewardLevel(newLevel);
  }, [totalPoints]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const generateRandomCoins = () => {
    return Math.floor(Math.random() * 25) + 15;
  };

  const getRandomBalanceIncrease = () => {
    return Math.floor(Math.random() * (150 - 100 + 1)) + 100;
  };

  const startQuiz = async () => {
    setStartingQuiz(true);
    coinSounds.collect.play('start');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowWelcome(false);
  };

  const handleCpfValidationComplete = (
    cpf: string,
    evaluations: number,
    minValue: number,
    maxValue: number,
    nome: string
  ) => {
    setUserCpf(cpf);
    setAvailableEvaluations(evaluations);
    setRewardRange({ min: minValue, max: 1548.00 });
    setUserName(nome);
    setShowCpfValidation(false);
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    coinSounds.celebration.play('main');
  };

  const handleBackToWelcome = () => {
    setShowCpfValidation(false);
    setShowWelcome(true);
    setStartingQuiz(false);
  };

  const playCoinCollectSound = () => {
    const sounds = [
      () => coinSounds.collect.play('start'),
      () => coinSounds.collect.play('end'),
      () => coinSounds.reward.play('short')
    ];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound();
  };

  const playVictorySequence = async () => {
    coinSounds.victory.play('full');
    await new Promise(resolve => setTimeout(resolve, 800));
    coinSounds.celebration.play('main');
    coinSounds.success.play();
  };

  const handleAnswer = async (option: string) => {
    if (isAnimatingCoins) return;
    
    setIsAnimatingCoins(true);
    setIsTransitioning(true);
    setShowExplosion(true);
    setSelectedAnswers([...selectedAnswers, option]);
    
    coinSounds.collect.play('start');
    await new Promise(resolve => setTimeout(resolve, 180));
    
    setShowReward(true);
    const coins = generateRandomCoins();
    setTransitionCoins(coins);
    
    const newPoints = totalPoints + questions[currentQuestion].points;
    setTotalPoints(newPoints);
    
    const balanceIncrease = getRandomBalanceIncrease();
    const newBalance = balance + balanceIncrease;
    setBalance(newBalance);
    
    coinSounds.reward.play('long');
    
    // Mostrar popup do saldo após 1.2 segundos (20% mais rápido que 1.5s)
    setTimeout(() => {
      setShowBalancePopup(true);
      // TOCAR O SOM ESPECÍFICO DO POPUP
      coinSounds.popup.play();
    }, 1200);
    
    const totalAnimationTime = (coins * 0.03) + 2.8; // 20% mais rápido que 3.5 segundos
    
    await new Promise(resolve => setTimeout(resolve, totalAnimationTime * 1000));
    
    setShowExplosion(false);
    setShowReward(false);
    setIsTransitioning(false);
    setIsAnimatingCoins(false);
    setShowBalancePopup(false);

    // NOVA ORDEM: 6 perguntas → VSL → 4 perguntas → PIX → recompensa → erro
    if (currentQuestion === 5 && !hasCompletedVideo) {
      // Após a 6ª pergunta (índice 5), vai para VSL
      setShowVideoScreen(true);
    } else if (currentQuestion === 9 && hasCompletedVideo && !hasCompletedPix) {
      // Após a 10ª pergunta (índice 9), vai para PIX
      setShowPixScreen(true);
    } else if (currentQuestion < questions.length - 1) {
      // Continua com as perguntas
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Fim de todas as perguntas - vai para tela de erro/taxa
      setShowFireworks(true);
      setIsCompleted(true);
      setShowFailureScreen(true);
      playVictorySequence();
    }
  };

  const handleVideoComplete = () => {
    setShowVideoScreen(false);
    setHasCompletedVideo(true);
    
    // Após o vídeo, continua com as perguntas (pergunta 7)
    setCurrentQuestion(6);
  };

  const handlePixSubmit = (cpfData?: any) => {
    setShowPixScreen(false);
    setHasCompletedPix(true);
    
    if (cpfData) {
      // Salva os dados do CPF e mostra a tela de recompensa
      setCpfRewardData(cpfData);
      setShowCpfRewardScreen(true);
    } else {
      // Se não tem dados do CPF, vai direto para erro
      setShowFireworks(true);
      setIsCompleted(true);
      setShowFailureScreen(true);
      playVictorySequence();
    }
  };

  const handleCpfRewardContinue = () => {
    setShowCpfRewardScreen(false);
    
    // Após mostrar a recompensa do CPF, vai para tela de erro
    setShowFireworks(true);
    setIsCompleted(true);
    setShowFailureScreen(true);
    playVictorySequence();
  };

  // SE ESTÁ FAZENDO ANIMAÇÃO DAS MOEDAS - FUNDO IGUAL AO QUIZ E POPUP DO SALDO
  if (isTransitioning) {
    return (
      <div className="min-h-screen relative">
        {/* FUNDO COM NOVA PALETA */}
        <div className="absolute inset-0" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E44]/10 via-transparent to-[#FF7A00]/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(26,46,68,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,122,0,0.06),transparent_50%)]"></div>
        </div>
        
        {/* EXPLOSÃO */}
        {showExplosion && (
          <div className="absolute inset-0 flex items-center justify-center z-[999998]">
            <div className="explosion"></div>
          </div>
        )}
        
        {/* POPUP DO SALDO NO MEIO DA TELA - 20% MAIS RÁPIDO */}
        {showBalancePopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[999997]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 text-center max-w-sm mx-4"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-[#FF7A00] to-[#FF7A00] rounded-full mx-auto mb-6 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 1.6, // 20% mais rápido que 2 segundos
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <DollarSign className="w-10 h-10 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#212121' }}>
                Saldo Atualizado!
              </h3>
              
              <motion.div
                className="text-4xl font-bold mb-4"
                style={{ color: '#FF7A00' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.24, type: "spring", stiffness: 200 }} // 20% mais rápido que 0.3s
              >
                {formatCurrency(balance)}
              </motion.div>
              
              <p style={{ color: '#666666' }}>
                Continue respondendo para ganhar mais!
              </p>
              
              <div className="mt-4 flex items-center justify-center gap-2">
                <Star className="w-5 h-5" style={{ color: '#FF7A00' }} />
                <span className="text-sm" style={{ color: '#666666' }}>
                  +{questions[currentQuestion]?.points || 0} pontos adicionados
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* MOEDAS VOANDO */}
        <div className="fixed inset-0 pointer-events-none z-[999999]">
          {Array.from({ length: transitionCoins }).map((_, index) => {
            const delay = index * 0.03;
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            const endX = window.innerWidth - 100;
            const endY = 100;
            
            const style = {
              '--start-x': `${startX}px`,
              '--start-y': `${startY}px`,
              '--end-x': `${endX}px`,
              '--end-y': `${endY}px`,
              '--burst-x': `${(Math.random() - 0.5) * 200}px`,
              '--burst-y': `${(Math.random() - 0.5) * 200}px`,
              '--burst-rotate': `${Math.random() * 720}deg`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties;
            
            if (!isCompleted && index % 3 === 0) {
              setTimeout(() => playCoinCollectSound(), delay * 1000);
            }
            
            return (
              <div key={index} className="coin-line" style={style}>
                <div className="coin" style={{ transform: `scale(${0.2 + Math.random() * 0.2})` }}></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#F7F8FA' }}>
        {/* FUNDO COM NOVA PALETA */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ backgroundColor: '#F7F8FA' }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E44]/5 via-transparent to-[#FF7A00]/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(26,46,68,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,122,0,0.06),transparent_50%)]"></div>
        </div>

        <div className={`relative z-10 text-center transition-all duration-1000 ${startingQuiz ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="max-w-[420px] mx-auto">
            {/* Moeda no topo com efeito */}
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="coin w-16 h-16 mx-auto animate-welcome-coin" style={{ background: 'linear-gradient(45deg, #FF7A00, #FF7A00)' }}>
                <div className="absolute inset-0 animate-coin-shine"></div>
              </div>
              
              <div className="coin w-10 h-10 absolute top-[-6px] left-[-20px] animate-float-delayed opacity-70" style={{ background: 'linear-gradient(45deg, #FF7A00, #FF7A00)' }}></div>
              <div className="coin w-8 h-8 absolute bottom-[-3px] right-[-15px] animate-float-reverse opacity-50" style={{ background: 'linear-gradient(45deg, #FF7A00, #FF7A00)' }}></div>
            </motion.div>

            {/* Headline principal com nova paleta */}
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold mb-6 leading-tight"
              style={{ color: '#212121' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Cansado de trabalhar o mês inteiro e ainda ver a{' '}
              <span className="relative">
                <span className="font-black" style={{ color: '#FF7A00' }}>
                  conta zerada
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: '#FF7A00' }}></div>
              </span>{' '}
              no fim do dia?
            </motion.h1>

            {/* Seção principal reformulada */}
            <motion.div
              className="mb-6 rounded-xl p-5 border shadow-lg"
              style={{ 
                backgroundColor: 'white',
                borderColor: '#1A2E44',
                borderWidth: '1px'
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="leading-relaxed mb-4" style={{ color: '#212121' }}>
                Tem gente na mesma situação que você —{' '}
                <span className="font-bold" style={{ color: '#FF7A00' }}>desempregado, endividado, sem renda</span>{' '}
                — que começou a fazer dinheiro{' '}
                <span className="font-bold" style={{ color: '#1A2E44' }}>respondendo perguntas no celular</span>
              </p>
              
              {/* Lista reformulada com design profissional */}
              <div className="space-y-3">
                {[
                  { text: "Sem patrão", icon: "🚫👔" },
                  { text: "Sem diploma", icon: "🚫🎓" },
                  { text: "Sem enrolação", icon: "🚫⏰" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-0.5 rounded-lg shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #1DB954, #1DB954)' }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="rounded-md p-3 flex items-center gap-3" style={{ backgroundColor: 'white' }}>
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-semibold flex-1" style={{ color: '#212121' }}>{item.text}</span>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#1DB954' }}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Seção de ação com cores melhoradas */}
            <motion.div
              className="mb-6 text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="mb-3 text-base" style={{ color: '#666666' }}>
                Enquanto você pensa se vai dar certo, outros já estão{' '}
                <span className="font-bold" style={{ color: '#FF7A00' }}>ganhando</span>
              </p>
              <div className="p-0.5 rounded-lg shadow-xl" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF7A00)' }}>
                <div className="rounded-md p-3" style={{ backgroundColor: 'white' }}>
                  <span className="font-bold text-base" style={{ color: '#FF7A00' }}>
                    Respondeu, ganhou. Respondeu de novo, ganhou mais.
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Valor em destaque com cores vibrantes */}
            <motion.div
              className="mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <div className="p-1 rounded-2xl shadow-2xl" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF7A00)' }}>
                <div className="rounded-xl p-4 text-center" style={{ background: 'linear-gradient(135deg, #1A2E44, #1A2E44)' }}>
                  <p className="font-bold mb-1 text-sm" style={{ color: '#FF7A00' }}>Ganhe até</p>
                  <div className="text-3xl sm:text-4xl font-black mb-1 text-white">
                    {formatCurrency(1548.00)}
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#FF7A00' }}>respondendo perguntas simples</p>
                </div>
              </div>
            </motion.div>
            
            {/* Botão principal com cores vibrantes */}
            <motion.button
              onClick={startQuiz}
              className="group relative w-full inline-flex items-center justify-center px-6 py-4 text-lg font-black text-white rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #FF7A00, #FF7A00)',
                boxShadow: '0 8px 32px rgba(255, 122, 0, 0.4)'
              }}
              disabled={startingQuiz}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-size-200 animate-gradient-x" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)' }}></div>
              <span className="relative flex items-center gap-2">
                COMEÇAR A GANHAR AGORA
                <Play className="w-5 h-5 animate-bounce" />
              </span>
            </motion.button>

            {/* Texto de segurança com cores melhoradas */}
            <motion.div
              className="mt-4 flex items-center justify-center gap-3 text-xs"
              style={{ color: '#666666' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" style={{ color: '#1DB954' }} />
                <span style={{ color: '#1DB954' }}>100% gratuito</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" style={{ color: '#1DB954' }} />
                <span style={{ color: '#1DB954' }}>Sem pegadinhas</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (showCpfValidation) {
    return (
      <CpfValidationScreen
        onValidationComplete={handleCpfValidationComplete}
        onBack={handleBackToWelcome}
      />
    );
  }

  if (showTransition) {
    return (
      <TransitionScreen
        name={userName}
        evaluations={availableEvaluations}
        onComplete={handleTransitionComplete}
      />
    );
  }

  if (showCpfRewardScreen && cpfRewardData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        {/* FUNDO COM NOVA PALETA */}
        <div className="absolute inset-0" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E44]/10 via-transparent to-[#FF7A00]/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(26,46,68,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,122,0,0.06),transparent_50%)]"></div>
        </div>
        <CpfRewardScreen
          balance={balance}
          cpfData={cpfRewardData}
          onContinue={handleCpfRewardContinue}
        />
      </div>
    );
  }

  if (showVideoScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        {/* FUNDO COM NOVA PALETA */}
        <div className="absolute inset-0" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E44]/10 via-transparent to-[#FF7A00]/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(26,46,68,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,122,0,0.06),transparent_50%)]"></div>
        </div>
        <VideoScreen
          balance={balance}
          onComplete={handleVideoComplete}
        />
      </div>
    );
  }

  if (showPixScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        {/* FUNDO COM NOVA PALETA */}
        <div className="absolute inset-0" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E44]/10 via-transparent to-[#FF7A00]/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(26,46,68,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,122,0,0.06),transparent_50%)]"></div>
        </div>
        <PixScreen
          balance={balance}
          onSubmit={handlePixSubmit}
        />
      </div>
    );
  }

  if (showFailureScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        {/* FUNDO COM NOVA PALETA */}
        <div className="absolute inset-0" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E44]/10 via-transparent to-[#FF7A00]/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(26,46,68,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,122,0,0.06),transparent_50%)]"></div>
        </div>
        <FailureScreen onContinue={() => {}} />
      </div>
    );
  }

  if (showIntermediate) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        {/* FUNDO COM NOVA PALETA */}
        <div className="absolute inset-0" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E44]/10 via-transparent to-[#FF7A00]/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(26,46,68,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,122,0,0.06),transparent_50%)]"></div>
        </div>
        <IntermediateScreen
          balance={balance}
          testimonials={testimonials}
        />
      </div>
    );
  }

  // TELA PRINCIPAL DO QUIZ - SÓ APARECE QUANDO NÃO ESTÁ EM TRANSIÇÃO
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* FUNDO COM NOVA PALETA */}
      <div className="absolute inset-0" style={{ backgroundColor: '#F7F8FA' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E44]/10 via-transparent to-[#FF7A00]/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(26,46,68,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,122,0,0.06),transparent_50%)]"></div>
      </div>
      
      {/* QUIZ */}
      <motion.div 
        className="quiz-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-full max-w-[380px] mx-auto border border-white/20">
          {/* Header do perfil com animação */}
          <motion.div 
            className="mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ProfileCard
              name={userName || 'Usuário'}
              balance={balance}
              remainingQuestions={questions.length - currentQuestion}
              totalQuestions={questions.length}
            />
          </motion.div>

          {/* Header da questão com moeda animada */}
          <motion.div 
            className="flex items-center gap-3 mb-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="quiz-coin">
              <div className="coin">
                <div className="absolute inset-0 animate-coin-shine"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold" style={{ color: '#212121' }}>
                Questão {currentQuestion + 1} de {questions.length}
              </h2>
              <ProgressBar
                current={currentQuestion + 1}
                total={questions.length}
                points={questions[currentQuestion].points}
                totalPoints={totalPoints}
              />
            </div>
          </motion.div>

          {/* Imagem da questão com overlay dinâmico */}
          <motion.div 
            className="relative rounded-xl overflow-hidden mb-4 aspect-video shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img
              src={questions[currentQuestion].image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Indicador de pontos na imagem */}
            <div className="absolute top-3 right-3 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg" style={{ background: 'linear-gradient(to right, #FF7A00, #FF7A00)' }}>
              +{questions[currentQuestion].points} pts
            </div>
          </motion.div>

          {/* Badges de nível com animação melhorada */}
          <motion.div
            className="mb-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {!isAnimatingCoins && (
              <div className="p-3 rounded-xl border shadow-sm" style={{ backgroundColor: '#F7F8FA', borderColor: '#1A2E44', borderWidth: '1px' }}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" style={{ color: '#FF7A00' }} />
                    <span className="text-sm font-medium" style={{ color: '#212121' }}>Nível Atual:</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {rewardLevels.map((level) => (
                      <RewardLevelBadge
                        key={level.name}
                        level={level}
                        isActive={level.name === currentRewardLevel.name}
                        showValue={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Pergunta com destaque */}
          <motion.h1 
            className="text-xl font-bold mb-5 leading-tight"
            style={{ color: '#212121' }}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {questions[currentQuestion].text}
          </motion.h1>

          {/* Opções de resposta com animações escalonadas */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnimatingCoins}
                className={`question-button w-full text-left flex items-center justify-between group ${
                  isAnimatingCoins ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={!isAnimatingCoins ? { 
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(255, 122, 0, 0.15)"
                } : {}}
                whileTap={!isAnimatingCoins ? { scale: 0.98 } : {}}
              >
                <span className="font-medium" style={{ color: '#212121' }}>{option}</span>
                <ChevronRight className="w-5 h-5 transition-colors duration-200" style={{ color: '#666666' }} />
              </motion.button>
            ))}
          </div>

          {/* Feedback motivacional */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-sm" style={{ color: '#666666' }}>
              💡 Cada resposta te aproxima da recompensa!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;