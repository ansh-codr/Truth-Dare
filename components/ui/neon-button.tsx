'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function NeonButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className 
}: NeonButtonProps) {
  const variants = {
    primary: 'bg-neonPurple hover:bg-neonPurple/80 text-white shadow-neon',
    secondary: 'bg-romanticPink hover:bg-romanticPink/80 text-gray-800 shadow-romantic',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-glow',
  };

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg',
  };

  return (
    <motion.button
      className={cn(
        'rounded-full font-semibold backdrop-blur-sm border border-white/20 transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      animate={!disabled ? { boxShadow: ['0 0 20px rgba(179, 136, 235, 0.5)', '0 0 30px rgba(179, 136, 235, 0.8)', '0 0 20px rgba(179, 136, 235, 0.5)'] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}