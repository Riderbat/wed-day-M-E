import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import localFont from 'next/font/local';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const rightism = localFont({
  src: [
    { path: '../public/ShelleyVolante.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-rightism',
  display: 'swap',
});

const trixiepro = localFont({
  src: [
    { path: '../public/Lora-Italic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-trixiepro',
  display: 'swap',
});

export const viewport = {
  width: 'device-width' as const,
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Егор и Мария • 20 июня 2026',
  description: 'Приглашение на свадьбу Егора и Марии',
  keywords: 'свадьба, приглашение, Егор, Мария, 2026',
  openGraph: {
    title: 'Егор и Мария • 20 июня 2026',
    description: 'Приглашение на свадьбу Егора и Марии',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable} ${rightism.variable} ${trixiepro.variable}`}>
      <body className={`${trixiepro.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}