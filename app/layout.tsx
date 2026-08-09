import type { Metadata } from 'next';
import { Antic_Didone, Inter, Caveat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const anticDidone = Antic_Didone({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display-loaded',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body-loaded',
  display: 'swap',
});
const caveat = Caveat({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-hand-loaded',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bloom & Blossom — Handworked, one story at a time',
  description:
    'Rakhi, kaleere, and charm jewellery made once, for one person. Begin yours.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${anticDidone.variable} ${inter.variable} ${caveat.variable} font-body`}
        style={
          {
            '--font-display': 'var(--font-display-loaded)',
            '--font-body': 'var(--font-body-loaded)',
            '--font-hand': 'var(--font-hand-loaded)',
          } as React.CSSProperties
        }
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
