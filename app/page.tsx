'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Main title with animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl mb-4"
          >
            💕
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-romanticPink via-neonPurple to-softBlue bg-clip-text text-transparent">
            Truth & Dare
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Create unforgettable moments with friends through our romantic-themed Truth & Dare game. 
            Share laughs, secrets, and dares in a beautiful, private setting.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <GlassCard className="p-6 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Up to 10 Players</h3>
            <p className="text-white/70">Invite your friends for an intimate game experience</p>
          </GlassCard>
          
          <GlassCard className="p-6 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">Private Rooms</h3>
            <p className="text-white/70">Secure, invite-only games for your group</p>
          </GlassCard>
          
          <GlassCard className="p-6 text-center">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-white mb-2">Romantic Themes</h3>
            <p className="text-white/70">Carefully crafted questions for every mood</p>
          </GlassCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-8"
        >
          <GlassCard className="p-12 backdrop-blur-lg bg-white/20">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Heart className="text-loveGlow" size={32} />
              <h2 className="text-3xl font-bold text-white">Ready to Play?</h2>
              <Heart className="text-loveGlow" size={32} />
            </div>
            
            <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
              Create a room and invite your friends for an unforgettable evening of truth, dares, and laughter.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NeonButton
                onClick={() => router.push('/create')}
                size="lg"
                className="text-2xl py-6 px-16 shadow-glow animate-pulse-glow"
              >
                ✨ Create Game Room ✨
              </NeonButton>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Floating hearts decoration */}
        {isClient && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl text-loveGlow/30"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                }}
                animate={{
                  y: -100,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 2,
                }}
              >
                💖
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}