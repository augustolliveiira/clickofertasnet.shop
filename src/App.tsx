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
  const [isPostVideo, setIsPostVideo] = useState(false);
  const [showRewardScreen, setShowRewardScreen] = useState(false);
  const [showCpfRewardScreen, setShowCpfRewardScreen] = useState(false);
  const [cpfRewardData, setCpfRewardData] = useState<any>(null);

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
    
    const totalAnimationTime = (coins * 0.03) + 1.2;
    
    await new Promise(resolve => setTimeout(resolve, totalAnimationTime * 1000));
    
    setShowExplosion(false);
    setShowReward(false);
    setIsTransitioning(false);
    setIsAnimatingCoins(false);

    if (currentQuestion < 5) {
      setCurrentQuestion(prev => prev + 1);
    } else if (!isPostVideo) {
      setShowVideoScreen(true);
      setIsPostVideo(true);
      setCurrentQuestion(6);
    } else if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowFireworks(true);
      setIsCompleted(true);
      setShowPixScreen(true); // Vai direto para a tela PIX
      playVictorySequence();
    }
  };

  const handleVideoComplete = () => {
    setShowVideoScreen(false);
  };

  const handlePixSubmit = (cpfData?: any) => {
    setShowPixScreen(false);
    
    if (cpfData) {
      // Se tem dados do CPF, mostra a tela dinâmica
      setCpfRewardData(cpfData);
      setShowCpfRewardScreen(true);
    } else {
      // Se não tem dados do CPF, vai direto para a taxa de segurança
      setShowFailureScreen(true);
    }
  };

  const handleCpfRewardContinue = () => {
    setShowCpfRewardScreen(false);
    setShowFailureScreen(true);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
        <div className={`relative z-10 text-center transition-all duration-1000 ${startingQuiz ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="max-w-[380px] mx-auto">
            <h1 className="text-primary text-4xl font-bold tracking-widest mb-8 [text-shadow:_0_0_30px_rgb(124_58_237_/_0.3)] animate-pulse">
              CUPOM PREMIADO
            </h1>
            
            <div className="relative mb-6">
              <div className="coin w-32 h-32 mx-auto animate-welcome-coin">
                <div className="absolute inset-0 animate-coin-shine"></div>
              </div>
              
              <div className="coin w-24 h-24 absolute top-[-20px] left-[-40px] animate-float-delayed opacity-50"></div>
              <div className="coin w-20 h-20 absolute bottom-[-10px] right-[-30px] animate-float-reverse opacity-30"></div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Participe da seleção e receba até
            </h2>
            <div className="text-4xl sm:text-5xl font-bold text-primary mb-6 animate-pulse">
              {formatCurrency(1548.00)}
            </div>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Estamos selecionando pessoas para um programa de avaliação digital com premiação
            </p>
            
            <button
              onClick={startQuiz}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#FFB800] to-[#FF8500] rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              disabled={startingQuiz}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FFB800] via-[#FF8500] to-[#FFB800] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-size-200 animate-gradient-x"></div>
              <span className="relative flex items-center">
                Começar Agora
                <Play className="w-5 h-5 ml-2 animate-bounce" />
              </span>
            </button>
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-purple-400">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <CpfRewardScreen
          balance={balance}
          cpfData={cpfRewardData}
          onContinue={handleCpfRewardContinue}
        />
      </div>
    );
  }

  if (showPixScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-purple-400">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-purple-400">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <FailureScreen onContinue={() => {}} />
      </div>
    );
  }

  if (showIntermediate) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-purple-400">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <IntermediateScreen
          balance={balance}
          testimonials={testimonials}
        />
      </div>
    );
  }

  if (showVideoScreen) {
    return (
      <VideoScreen
        balance={balance}
        onComplete={handleVideoComplete}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-purple-400">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      {(showFireworks || isTransitioning) && (
        <div className="absolute inset-0 bg-black bg-opacity-70 transition-opacity duration-1000"></div>
      )}
      
      {showExplosion && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="explosion"></div>
        </div>
      )}
      
      {(isTransitioning || showReward || isCompleted) && (
        <div className="fixed inset-0 pointer-events-none">
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
      )}

      <div className={`quiz-container ${isTransitioning ? 'transitioning' : ''}`}>
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-6 w-full max-w-[340px] mx-auto">
          <div className="mb-6">
            <ProfileCard
              name={userName || 'Usuário'}
              balance={balance}
              remainingQuestions={questions.length - currentQuestion}
              totalQuestions={questions.length}
            />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="quiz-coin">
              <div className="coin">
                <div className="absolute inset-0 animate-coin-shine"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                Questão {currentQuestion + 1} de {questions.length}
              </h2>
              <ProgressBar
                current={currentQuestion + 1}
                total={questions.length}
                points={questions[currentQuestion].points}
                totalPoints={totalPoints}
              />
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden mb-4 aspect-video">
            <img
              src={questions[currentQuestion].image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <div className="mb-4">
            {!isAnimatingCoins && (
              <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center justify-between gap-1.5">
                  <Shield className="w-4 h-4 text-primary" />
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
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-4">
            {questions[currentQuestion].text}
          </h1>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnimatingCoins}
                className={`question-button w-full text-left flex items-center justify-between ${
                  isAnimatingCoins ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="text-gray-700">{option}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;