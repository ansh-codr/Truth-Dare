'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Share2, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { NeonButton } from '@/components/ui/neon-button';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

export function InviteModal({ isOpen, onClose, roomId }: InviteModalProps) {
  const [copied, setCopied] = useState(false);
  
  const inviteUrl = `${window.location.origin}/join/${roomId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join our Truth & Dare game!',
          text: 'Come play Truth & Dare with us! 💕',
          url: inviteUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              💌
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Invite Your Friends!
            </h2>
            <p className="text-white/80">
              Share this link to let others join your game
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
              <p className="text-white text-sm break-all">
                {inviteUrl}
              </p>
            </div>

            <div className="flex space-x-3">
              <NeonButton
                onClick={copyToClipboard}
                variant="primary"
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <Copy size={20} />
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </NeonButton>

              <NeonButton
                onClick={shareInvite}
                variant="secondary"
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <Share2 size={20} />
                <span>Share</span>
              </NeonButton>
            </div>
          </div>

          <motion.div
            className="mt-6 text-center text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Room ID: {roomId}
          </motion.div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}