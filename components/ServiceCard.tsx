'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href = '/services',
  delay = 0,
}: ServiceCardProps) {
  const cardContent = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-2 border-navy rounded-lg p-6 h-full shadow-soft hover:shadow-medium hover:border-medium-blue transition-all duration-300"
    >
      {icon && <div className="mb-4 text-4xl text-navy">{icon}</div>}
      <h3 className="font-heading font-bold text-xl md:text-2xl text-navy mb-3">
        {title}
      </h3>
      <p className="text-dark-gray leading-relaxed">{description}</p>
    </motion.div>
  );

  return (
    <FadeIn delay={delay}>
      {href ? (
        <Link href={href} className="block h-full focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded-lg">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </FadeIn>
  );
}
