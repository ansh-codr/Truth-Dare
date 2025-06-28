import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { GameProvider } from '@/lib/game-context';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Truth & Dare - Romantic Game Experience',
  description: 'Create unforgettable moments with friends through our romantic-themed Truth & Dare game',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}