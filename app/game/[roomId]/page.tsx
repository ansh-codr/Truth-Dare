'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, Settings } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';
import { PlayerAvatar } from '@/components/game/player-avatar';
import { SpinWheel } from '@/components/game/spin-wheel';
import { TruthDarePicker } from '@/components/game/truth-dare-picker';
import { QuestionCard } from '@/components/game/question-card';
import { ThemeSelector } from '@/components/game/theme-selector';
import { useGame } from '@/lib/game-context';
import { generateDynamicQuestion } from '@/lib/questions';

interface PageProps {
  params: {
    roomId: string;
  };
}

type GamePhase = 'waiting' | 'spinning' | 'choosing' | 'question' | 'completed';

export default function GameRoom({ params }: PageProps) {
  const [gamePhase, setGamePhase] = useState<GamePhase>('waiting');
  const [showSettings, setShowSettings] = useState(false);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [roomId, setRoomId] = useState<string>('');
  const { state, dispatch } = useGame();
  const router = useRouter();

  const currentPlayer = state.room?.players.find(p => p.id === state.room?.currentPlayer);
  const isCurrentPlayer = state.currentUserId === state.room?.currentPlayer;

  useEffect(() => {
    // Get room ID from URL params
    const currentRoomId = params?.roomId || '';
    setRoomId(currentRoomId);

    // If no room in state, create a demo room
    if (!state.room && currentRoomId) {
      const demoRoom = {
        id: currentRoomId,
        players: [
          {
            id: 'demo-player-1',
            name: 'You',
            avatar: '💕',
            isHost: true,
          },
          {
            id: 'demo-player-2',
            name: 'Friend',
            avatar: '💖',
            isHost: false,
          }
        ],
        currentPlayer: 'demo-player-1',
        gameStarted: true,
        currentQuestion: null,
        questionType: null as 'truth' | 'dare' | null,
        theme: 'flirty' as const,
      };

      dispatch({
        type: 'JOIN_ROOM',
        payload: { room: demoRoom, playerId: 'demo-player-1' }
      });
    }

    if (state.room?.gameStarted && state.room?.currentPlayer) {
      setGamePhase('spinning');
    }
  }, [state.room, params, dispatch]);

  const handlePlayerSelected = (playerId: string) => {
    dispatch({ type: 'SET_CURRENT_PLAYER', payload: playerId });
    setGamePhase('choosing');
  };

  const handleTruthDareChoice = (choice: 'truth' | 'dare') => {
    if (!state.room || isGeneratingQuestion) return;
    
    setIsGeneratingQuestion(true);
    
    // Simulate a brief delay for better UX
    setTimeout(() => {
      try {
        const question = generateDynamicQuestion(choice, state.room!.theme);
        
        dispatch({ 
          type: 'SET_QUESTION', 
          payload: { question: question.text, type: choice }
        });
        setGamePhase('question');
      } catch (error) {
        console.error('Error generating question:', error);
      } finally {
        setIsGeneratingQuestion(false);
      }
    }, 1000);
  };

  const handleNextTurn = () => {
    dispatch({ type: 'NEXT_TURN' });
    setGamePhase('spinning');
  };

  const handleThemeChange = (theme: 'funny' | 'flirty' | 'deep' | 'naughty') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const handleLeaveGame = () => {
    dispatch({ type: 'LEAVE_ROOM' });
    router.push('/');
  };

  // Show loading if no room ID yet
  if (!roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading game...</div>
      </div>
    );
  }

  if (!state.room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Setting up game room...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative p-4">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <NeonButton
          onClick={handleLeaveGame}
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Home size={16} />
          <span>Leave</span>
        </NeonButton>

        <GlassCard className="px-4 py-2">
          <p className="text-white/80 text-sm">
            Room: <span className="text-loveGlow font-mono">{roomId}</span>
          </p>
        </GlassCard>

        <NeonButton
          onClick={() => setShowSettings(!showSettings)}
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Settings size={16} />
          <span>Theme</span>
        </NeonButton>
      </div>

      {/* Theme Settings */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <h3 className="text-white text-lg font-semibold mb-4 text-center">
              Game Theme
            </h3>
            <ThemeSelector
              currentTheme={state.room.theme}
              onThemeChange={handleThemeChange}
            />
            <p className="text-white/60 text-sm text-center mt-4">
              🎯 Questions are dynamically generated based on your theme choice!
            </p>
          </GlassCard>
        </motion.div>
      )}

      {/* Players Bar */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <GlassCard className="p-4">
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            {state.room.players.map((player) => (
              <PlayerAvatar
                key={player.id}
                player={player}
                isActive={player.id === state.room?.currentPlayer}
                size="sm"
              />
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Game Content */}
      <div className="max-w-4xl mx-auto">
        {gamePhase === 'waiting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <GlassCard className="p-12">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🎮
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Game Starting...
              </h2>
              <p className="text-white/80 text-lg">
                Get ready for an amazing Truth & Dare experience!
              </p>
            </GlassCard>
          </motion.div>
        )}

        {gamePhase === 'spinning' && (
          <SpinWheel
            players={state.room.players}
            onPlayerSelected={handlePlayerSelected}
          />
        )}

        {gamePhase === 'choosing' && currentPlayer && (
          <TruthDarePicker
            playerName={currentPlayer.name}
            onChoice={handleTruthDareChoice}
            isGenerating={isGeneratingQuestion}
          />
        )}

        {gamePhase === 'question' && currentPlayer && state.room.currentQuestion && state.room.questionType && (
          <QuestionCard
            question={state.room.currentQuestion}
            type={state.room.questionType}
            playerName={currentPlayer.name}
            onNext={handleNextTurn}
            isAIGenerated={false}
          />
        )}
      </div>

      {/* Current player indicator */}
      {currentPlayer && gamePhase !== 'spinning' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 left-4"
        >
          <GlassCard className="p-3">
            <div className="flex items-center space-x-2">
              <PlayerAvatar player={currentPlayer} size="sm" />
              <div className="text-white/80 text-sm">
                <p className="font-semibold">{currentPlayer.name}&apos;s turn</p>
                {isCurrentPlayer && (
                  <p className="text-loveGlow">That&apos;s you!</p>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Question Generation Indicator */}
      {isGeneratingQuestion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <GlassCard className="p-6 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-4xl mb-4"
            >
              🎯
            </motion.div>
            <p className="text-white font-semibold">
              Crafting your perfect question...
            </p>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}