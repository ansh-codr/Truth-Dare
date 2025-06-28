'use client';

import { motion } from 'framer-motion';
import { Player } from '@/lib/game-context';

interface PlayerAvatarProps {
  player: Player;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PlayerAvatar({ player, isActive = false, size = 'md' }: PlayerAvatarProps) {
  const sizes = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        className={`${sizes[size]} rounded-full bg-gradient-to-br from-romanticPink to-softBlue flex items-center justify-center backdrop-blur-sm border-2 ${
          isActive ? 'border-loveGlow shadow-glow' : 'border-white/30'
        }`}
        animate={isActive ? {
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        } : {}}
        transition={{
          duration: 1.5,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="filter drop-shadow-sm">{player.avatar}</span>
      </motion.div>
      
      <motion.div
        className={`text-center ${isActive ? 'text-loveGlow font-bold' : 'text-white/80'}`}
        animate={isActive ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
      >
        <p className="text-sm font-medium truncate max-w-20">{player.name}</p>
        {player.isHost && (
          <p className="text-xs text-loveGlow">👑 Host</p>
        )}
      </motion.div>
    </div>
  );
}