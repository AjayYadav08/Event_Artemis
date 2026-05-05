import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className, fallbackSrc }) => {
  const [error, setError] = useState(false);
  const defaultFallback = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop";

  if (!src || error) {
    return (
      <img 
        src={fallbackSrc || defaultFallback} 
        alt={alt} 
        className={className} 
      />
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

export default ImageWithFallback;
