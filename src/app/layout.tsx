import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TikTokPixel from '../components/TikTokPixel';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Coussin de Protection Anti-Chute pour Bébé | CoussinBaby.com",
  description: "Protégez la tête et le dos de votre bébé avec le coussin de sécurité CoussinBaby. Léger et confortable, il accompagne ses premières explorations en toute sérénité. Livraison rapide.",
  metadataBase: new URL('https://www.coussinbaby.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Coussin de Protection Anti-Chute pour Bébé | CoussinBaby.com',
    description: 'Protégez la tête et le dos de votre bébé avec le coussin de sécurité CoussinBaby. Léger et confortable, il accompagne ses premières explorations en toute sérénité.',
    url: 'https://www.coussinbaby.com',
    siteName: 'CoussinBaby',
    images: [
      {
        url: 'https://www.coussinbaby.com/images/cushion-1.png',
        width: 800,
        height: 600,
        alt: 'Coussin de protection pour bébé',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', type: 'image/x-icon', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gradient-to-br from-sky-200 to-pink-200 min-h-screen`}>
        <TikTokPixel />
        {children}
      </body>
    </html>
  );
}

