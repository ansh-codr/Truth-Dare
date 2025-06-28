'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { NeonButton } from '@/components/ui/neon-button';
import { GlassCard } from '@/components/ui/glass-card';

interface TruthDarePickerProps {
  onChoice: (choice: 'truth' | 'dare') => void;
  playerName: string;
  isGenerating?: boolean;
}

export function TruthDarePicker({ onChoice, playerName, isGenerating = false }: TruthDarePickerProps) {
  const [selectedChoice, setSelectedChoice] = useState<'truth' | 'dare' | null>(null);

  const handleChoice = (choice: 'truth' | 'dare') => {
    if (isGenerating) return;
    
    setSelectedChoice(choice);
    setTimeout(() => {
      onChoice(choice);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center space-y-8"
    >
      <GlassCard className="p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {playerName}, choose your destiny! 💫
        </h2>
        <p className="text-white/80 text-lg mb-2">
          What will it be?
        </p>
        <p className="text-loveGlow text-sm">
          🤖 AI will generate a unique question just for you!
        </p>
      </GlassCard>

      <div className="flex space-x-6">
        <motion.div
          whileHover={!isGenerating ? { scale: 1.05 } : {}}
          whileTap={!isGenerating ? { scale: 0.95 } : {}}
        >
          <NeonButton
            onClick={() => handleChoice('truth')}
            variant="primary"
            size="lg"
            disabled={isGenerating}
            className={`${selectedChoice === 'truth' ? 'ring-4 ring-loveGlow' : ''} ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-4xl">🤔</span>
              <span className="text-xl font-bold">TRUTH</span>
            </div>
          </NeonButton>
        </motion.div>

        <motion.div
          whileHover={!isGenerating ? { scale: 1.05 } : {}}
          whileTap={!isGenerating ? { scale: 0.95 } : {}}
        >
          <NeonButton
            onClick={() => handleChoice('dare')}
            variant="secondary"
            size="lg"
            disabled={isGenerating}
            className={`${selectedChoice === 'dare' ? 'ring-4 ring-loveGlow' : ''} ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-4xl">⚡</span>
              <span className="text-xl font-bold">DARE</span>
            </div>
          </NeonButton>
        </motion.div>
      </div>

      {(selectedChoice || isGenerating) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-4xl mb-2">
            {isGenerating ? '🤖' : selectedChoice === 'truth' ? '💭' : '🚀'}
          </div>
          <p className="text-loveGlow font-semibold">
            {isGenerating 
              ? 'AI is generating your question...' 
              : `Generating your ${selectedChoice}...`
            }
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}