'use client';

import { motion } from 'framer-motion';
import { NeonButton } from '@/components/ui/neon-button';

interface ThemeSelectorProps {
  currentTheme: 'funny' | 'flirty' | 'deep' | 'naughty';
  onThemeChange: (theme: 'funny' | 'flirty' | 'deep' | 'naughty') => void;
}

const themes = [
  { id: 'funny', name: 'Funny', emoji: '😄', color: 'bg-yellow-500' },
  { id: 'flirty', name: 'Flirty', emoji: '😘', color: 'bg-pink-500' },
  { id: 'deep', name: 'Deep', emoji: '🤔', color: 'bg-blue-500' },
  { id: 'naughty', name: 'Naughty', emoji: '😈', color: 'bg-red-500' },
] as const;

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {themes.map((theme) => (
        <motion.button
          key={theme.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onThemeChange(theme.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/20 transition-all duration-300 ${
            currentTheme === theme.id
              ? 'bg-white/30 text-white shadow-glow'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          <span className="mr-2">{theme.emoji}</span>
          {theme.name}
        </motion.button>
      ))}
    </div>
  );
}