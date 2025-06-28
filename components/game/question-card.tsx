'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';

interface QuestionCardProps {
  question: string;
  type: 'truth' | 'dare';
  playerName: string;
  onNext: () => void;
  isAIGenerated?: boolean;
}

export function QuestionCard({ question, type, playerName, onNext, isAIGenerated = false }: QuestionCardProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      onNext();
    }, 2000);
  };

  return (
    <>      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center space-y-8 max-w-2xl mx-auto"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          {type === 'truth' ? '💭' : '⚡'}
        </motion.div>

        <GlassCard className="p-8 text-center backdrop-blur-lg bg-white/20">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
              type === 'truth' 
                ? 'bg-neonPurple text-white' 
                : 'bg-romanticPink text-gray-800'
            }`}>
              {type.toUpperCase()}
            </span>
            {isAIGenerated && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                🤖 AI Generated
              </span>
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-6">
            {playerName}, here's your {type}:
          </h3>
          
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-white/10 rounded-2xl border border-white/20 mb-8"
          >
            <p className="text-lg text-white leading-relaxed">
              {question}
            </p>
          </motion.div>
          
          <div className="flex justify-center space-x-4">
            <NeonButton
              onClick={handleComplete}
              variant="primary"
              size="lg"
            >
              ✨ Complete & Next Turn
            </NeonButton>
          </div>

          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <div className="text-4xl">🎉</div>
              <p className="text-loveGlow font-semibold">Great job!</p>
            </motion.div>
          )}
        </GlassCard>

        {/* Floating hearts animation */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-loveGlow pointer-events-none"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-20, -80],
              x: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${50 + Math.random() * 20 - 10}%`,
              top: `${70 + Math.random() * 10}%`,
            }}
          >
            💖
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}