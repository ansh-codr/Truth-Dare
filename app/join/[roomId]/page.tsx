'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Share2, Users, Crown } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';
import { PlayerAvatar } from '@/components/game/player-avatar';
import { InviteModal } from '@/components/game/invite-modal';
import { useGame } from '@/lib/game-context';

const avatars = ['💕', '💖', '💗', '💝', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '❣️', '💔', '❤️‍🔥', '❤️‍🩹', '💋'];

interface PageProps {
  params: {
    roomId: string;
  };
}

export default function JoinRoom({ params }: PageProps) {
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('💖');
  const [hasJoined, setHasJoined] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { state, dispatch } = useGame();
  const router = useRouter();

  useEffect(() => {
    // Simulate checking if room exists and user is already in it
    if (state.room?.id === params.roomId) {
      setHasJoined(true);
    }
  }, [state.room, params.roomId]);

  const handleJoinRoom = () => {
    if (!playerName.trim()) return;

    const playerId = Math.random().toString(36).substring(2, 15);
    
    // Simulate joining an existing room or create a mock room
    if (!state.room || state.room.id !== params.roomId) {
      const mockRoom = {
        id: params.roomId,
        players: [
          {
            id: 'host-id',
            name: 'Game Host',
            avatar: '👑',
            isHost: true,
          }
        ],
        currentPlayer: null,
        gameStarted: false,
        currentQuestion: null,
        questionType: null as 'truth' | 'dare' | null,
        theme: 'flirty' as const,
      };

      dispatch({
        type: 'JOIN_ROOM',
        payload: { room: mockRoom, playerId }
      });
    }

    dispatch({
      type: 'ADD_PLAYER',
      payload: {
        id: playerId,
        name: playerName.trim(),
        avatar: selectedAvatar,
        isHost: false,
      }
    });

    setHasJoined(true);
  };

  const handleStartGame = () => {
    dispatch({ type: 'START_GAME' });
    router.push(`/game/${params.roomId}/`);
  };

  const isHost = state.room?.players.find(p => p.id === state.currentUserId)?.isHost || false;
  const canStartGame = state.room && state.room.players.length >= 2;

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <div className="max-w-4xl mx-auto w-full">
        {!hasJoined ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <GlassCard className="p-8 backdrop-blur-lg bg-white/20">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-6xl mb-4"
                >
                  🎯
                </motion.div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Join Game Room
                </h1>
                <p className="text-white/80">
                  Room ID: <span className="font-mono text-loveGlow">{params.roomId}</span>
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-loveGlow focus:border-transparent backdrop-blur-sm"
                    maxLength={20}
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Choose Your Avatar
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {avatars.map((avatar) => (
                      <motion.button
                        key={avatar}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`p-3 rounded-2xl text-2xl transition-all duration-300 ${
                          selectedAvatar === avatar
                            ? 'bg-loveGlow/30 border-2 border-loveGlow shadow-glow'
                            : 'bg-white/10 border border-white/20 hover:bg-white/20'
                        }`}
                      >
                        {avatar}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <NeonButton
                  onClick={handleJoinRoom}
                  disabled={!playerName.trim()}
                  className="w-full"
                  size="lg"
                >
                  🎮 Join Game
                </NeonButton>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Header */}
            <GlassCard className="p-6 text-center backdrop-blur-lg bg-white/20">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Users className="text-loveGlow" size={32} />
                <h1 className="text-3xl font-bold text-white">Game Lobby</h1>
                <Users className="text-loveGlow" size={32} />
              </div>
              <p className="text-white/80">
                Room: <span className="font-mono text-loveGlow">{params.roomId}</span>
              </p>
              <p className="text-white/60 text-sm mt-2">
                {state.room?.players.length || 0}/10 players • Waiting for host to start
              </p>
            </GlassCard>

            {/* Players Grid */}
            <GlassCard className="p-8 backdrop-blur-lg bg-white/20">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                Players in Room
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {state.room?.players.map((player) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PlayerAvatar player={player} size="lg" />
                  </motion.div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, 10 - (state.room?.players.length || 0)) }).map((_, i) => (
                  <motion.div
                    key={`empty-${i}`}
                    className="flex flex-col items-center space-y-2"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center">
                      <span className="text-white/40 text-2xl">+</span>
                    </div>
                    <p className="text-white/40 text-sm">Waiting...</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton
                onClick={() => setShowInviteModal(true)}
                variant="secondary"
                className="flex items-center space-x-2"
              >
                <Share2 size={20} />
                <span>Invite Friends</span>
              </NeonButton>

              {isHost && (
                <NeonButton
                  onClick={handleStartGame}
                  disabled={!canStartGame}
                  variant="primary"
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  <Crown size={20} />
                  <span>
                    {canStartGame ? '🚀 Start Game' : 'Need 2+ Players'}
                  </span>
                </NeonButton>
              )}
            </div>

            {/* Waiting animation for non-hosts */}
            {!isHost && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-4"
                >
                  ⏳
                </motion.div>
                <p className="text-white/80">
                  Waiting for the host to start the game...
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        roomId={params.roomId}
      />
    </div>
  );
}