import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { GameProvider } from '@/lib/game-context';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Truth & Dare - Romantic Game Experience',
  description: 'Create unforgettable moments with friends through our romantic-themed Truth & Dare game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}