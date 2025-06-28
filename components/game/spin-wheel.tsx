'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Player } from '@/lib/game-context';
import { NeonButton } from '@/components/ui/neon-button';

interface SpinWheelProps {
  players: Player[];
  onPlayerSelected: (playerId: string) => void;
}

export function SpinWheel({ players, onPlayerSelected }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedPlayer(null);
    
    // Simulate spinning for 3 seconds
    setTimeout(() => {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      setSelectedPlayer(randomPlayer);
      setIsSpinning(false);
      onPlayerSelected(randomPlayer.id);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        {/* Spinning wheel */}
        <motion.div
          className="w-64 h-64 rounded-full border-8 border-loveGlow relative bg-gradient-to-br from-neonPurple to-romanticPink shadow-neon"
          animate={isSpinning ? {
            rotate: [0, 360 * 5]
          } : {}}
          transition={{
            duration: 3,
            ease: "easeOut",
          }}
        >
          {/* Player segments */}
          {players.map((player, index) => {
            const angle = (360 / players.length) * index;
            const rotation = angle - 90; // Start from top
            
            return (
              <motion.div
                key={player.id}
                className="absolute w-8 h-8 flex items-center justify-center text-2xl"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `rotate(${rotation}deg) translate(100px, -16px)`,
                }}
                animate={selectedPlayer?.id === player.id && !isSpinning ? {
                  scale: [1, 1.5, 1],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {player.avatar}
              </motion.div>
            );
          })}
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            {isSpinning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                💫
              </motion.div>
            ) : selectedPlayer ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl"
              >
                {selectedPlayer.avatar}
              </motion.div>
            ) : (
              <span className="text-2xl">🎯</span>
            )}
          </div>
        </motion.div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-loveGlow"></div>
        </div>
      </div>

      {selectedPlayer && !isSpinning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <h3 className="text-2xl font-bold text-loveGlow mb-2">
            {selectedPlayer.name}'s Turn! 💕
          </h3>
          <p className="text-white/80">Choose Truth or Dare</p>
        </motion.div>
      )}

      <NeonButton
        onClick={handleSpin}
        disabled={isSpinning}
        size="lg"
      >
        {isSpinning ? '🌟 Spinning...' : '🎯 Spin the Wheel'}
      </NeonButton>
    </div>
  );
}