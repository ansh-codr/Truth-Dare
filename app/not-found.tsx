'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center"
      >
        <GlassCard className="p-8 backdrop-blur-lg bg-white/20">
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
            className="text-6xl mb-6"
          >
            💔
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h1>
          
          <p className="text-white/80 text-lg mb-8">
            Looks like this page got lost in the game of love. Let's get you back to the fun!
          </p>
          
          <NeonButton
            onClick={() => router.push('/')}
            variant="primary"
            size="lg"
            className="flex items-center space-x-2 mx-auto"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </NeonButton>
        </GlassCard>
      </motion.div>
    </div>
  );
}