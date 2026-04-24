import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface StickyImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function StickyImage({
  src,
  alt,
  width = 800,
  height = 600,
  fill = false,
  className = "",
  priority = false,
  sizes
}: StickyImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`transition-opacity duration-300 object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onLoad={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}