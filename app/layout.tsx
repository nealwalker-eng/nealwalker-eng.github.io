import type { Metadata } from 'next';
import { Poppins, Work_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const workSans = Work_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'America Protective Security | Expert Security Services in MD, DC, VA',
    template: '%s | America Protective Security',
  },
  description: 'Professional security services for government and commercial clients. 20+ years of experience providing armed and unarmed guards, patrol services, firewatch, and remote monitoring in Maryland, DC, and Virginia.',
  keywords: [
    'security services',
    'armed guards',
    'unarmed guards',
    'patrol services',
    'firewatch',
    'remote monitoring',
    'Maryland security',
    'DC security',
    'Virginia security',
    'government security',
    'commercial security',
    'America Protective Security',
    'APS',
  ],
  authors: [{ name: 'America Protective Security' }],
  creator: 'America Protective Security',
  publisher: 'America Protective Security',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nealwalker-eng.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nealwalker-eng.github.io',
    siteName: 'America Protective Security',
    title: 'America Protective Security | Expert Security Services',
    description: 'Professional security services for government and commercial clients in MD, DC, and VA.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'America Protective Security | Expert Security Services',
    description: 'Professional security services for government and commercial clients.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${workSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#003366" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
