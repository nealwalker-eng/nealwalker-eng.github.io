'use client';

import Image from 'next/image';
import FadeIn from './FadeIn';

interface TwoColumnSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  content: string | React.ReactNode;
  reverse?: boolean;
  className?: string;
}

export default function TwoColumnSection({
  imageSrc,
  imageAlt,
  title,
  content,
  reverse = false,
  className = '',
}: TwoColumnSectionProps) {
  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`flex flex-col ${
            reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
          } items-center gap-8 lg:gap-12`}
        >
          {/* Image */}
          <FadeIn delay={0.2} className="flex-1 w-full">
            <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-medium">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.4} className="flex-1">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
              {title}
            </h2>
            <div className="text-dark-gray text-lg leading-relaxed">
              {typeof content === 'string' ? <p>{content}</p> : content}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
