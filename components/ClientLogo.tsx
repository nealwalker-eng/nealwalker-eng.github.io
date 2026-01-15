'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

interface ClientLogoProps {
  src: string;
  alt: string;
  delay?: number;
}

export default function ClientLogo({ src, alt, delay = 0 }: ClientLogoProps) {
  return (
    <FadeIn delay={delay}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-24 md:h-32 grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center p-4"
      >
        <Image
          src={src}
          alt={alt}
          width={200}
          height={100}
          className="object-contain max-h-full w-auto"
          sizes="(max-width: 768px) 150px, 200px"
        />
      </motion.div>
    </FadeIn>
  );
}
