'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';
import { InviteModal } from '@/components/game/invite-modal';
import { useGame } from '@/lib/game-context';

const avatars = ['💕', '💖', '💗', '💝', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '❣️', '💔', '❤️‍🔥', '❤️‍🩹', '💋'];

export default function CreateRoom() {
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('💕');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const { state, dispatch } = useGame();
  const router = useRouter();

  const handleCreateRoom = () => {
    if (!playerName.trim()) return;

    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const playerId = Math.random().toString(36).substring(2, 15);

    dispatch({
      type: 'CREATE_ROOM',
      payload: {
        roomId,
        hostName: playerName.trim(),
        hostId: playerId,
      }
    });

    setRoomCreated(true);
    setShowInviteModal(true);
  };

  const handleJoinRoom = () => {
    if (state.room) {
      router.push(`/join/${state.room.id}`);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <div className="max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
                {roomCreated ? '🎉' : '💝'}
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {roomCreated ? 'Room Created!' : 'Create Game Room'}
              </h1>
              <p className="text-white/80">
                {roomCreated 
                  ? 'Share the invite link with your friends' 
                  : 'Set up your profile and create a private room'
                }
              </p>
            </div>

            {!roomCreated ? (
              <div className="space-y-6">
                {/* Name input */}
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

                {/* Avatar selection */}
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
                  onClick={handleCreateRoom}
                  disabled={!playerName.trim()}
                  className="w-full"
                  size="lg"
                >
                  ✨ Create Room ✨
                </NeonButton>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="p-4 bg-white/10 rounded-2xl border border-white/20"
                >
                  <p className="text-white/80 text-sm">Room ID</p>
                  <p className="text-2xl font-bold text-loveGlow">{state.room?.id}</p>
                </motion.div>

                <div className="space-y-3">
                  <NeonButton
                    onClick={() => setShowInviteModal(true)}
                    variant="primary"
                    className="w-full"
                  >
                    📤 Share Invite Link
                  </NeonButton>
                  
                  <NeonButton
                    onClick={handleJoinRoom}
                    variant="secondary"
                    className="w-full"
                  >
                    🚀 Enter Game Lobby
                  </NeonButton>
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        roomId={state.room?.id || ''}
      />
    </div>
  );
}