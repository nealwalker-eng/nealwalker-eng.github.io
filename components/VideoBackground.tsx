'use client';

import { useState } from 'react';
import Image from 'next/image';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  overlay?: boolean;
}

export default function VideoBackground({
  videoSrc,
  posterSrc,
  className = '',
  overlay = true,
}: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster={posterSrc}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {posterSrc && !isLoaded && (
        <div className="absolute inset-0">
          <Image
            src={posterSrc}
            alt="Video poster"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      {overlay && (
        <div className="absolute inset-0 bg-hero-gradient opacity-30" />
      )}
    </div>
  );
}
