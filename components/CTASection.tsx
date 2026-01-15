'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

interface CTASectionProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

export default function CTASection({
  title,
  description,
  ctaText,
  ctaLink,
  className = '',
}: CTASectionProps) {
  return (
    <section className={`bg-navy text-white py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <Link
            href={ctaLink}
            className="inline-block bg-medium-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-navy transition-colors duration-300 shadow-medium focus:outline-none focus:ring-2 focus:ring-medium-blue focus:ring-offset-2 focus:ring-offset-navy"
          >
            {ctaText}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
