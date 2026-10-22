import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { assetUrl } from '../../utils/media';

type Props = { src?: string; alt: string; className?: string; eager?: boolean };

export function SmartImage({ src, alt, className = '', eager = false }: Props) {
  const [failedSource, setFailedSource] = useState<string | undefined>();
  const missing = !src || failedSource === src;

  if (missing) {
    return (
      <div className={`media-fallback ${className}`} role="img" aria-label={`Image unavailable: ${alt}`}>
        <ImageOff aria-hidden="true" size={26} strokeWidth={1.5} />
        <span>Image coming soon</span>
      </div>
    );
  }

  return (
    <img
      src={assetUrl(src)}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailedSource(src)}
    />
  );
}
