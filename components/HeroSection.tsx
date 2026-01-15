'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import VideoBackground from './VideoBackground';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  videoSrc?: string;
  posterSrc?: string;
  backgroundImage?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '/contact',
  videoSrc,
  posterSrc,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      {videoSrc ? (
        <VideoBackground videoSrc={videoSrc} posterSrc={posterSrc} />
      ) : backgroundImage ? (
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-30" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-hero-gradient" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            className="text-white/90 text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
        {ctaText && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
          >
            <Link
              href={ctaLink}
              className="inline-block bg-navy text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-medium-blue transition-colors duration-300 shadow-medium focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {ctaText}
            </Link>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-3 bg-white/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
