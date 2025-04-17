import React from 'react';
import type { ImageProps } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

const AvifImage: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  if (src?.toLowerCase().includes('.svg') || src?.includes('imageMogr2/')) {
    return <Image src={src} alt={alt} {...props} />;
  }

  return (
    <picture>
      <source srcSet={`${src}?imageMogr2/format/avif`} type="image/avif" />
      <source srcSet={`${src}?imageMogr2/format/webp`} type="image/webp" />
      <Image src={src} alt={alt} {...props} />
    </picture>
  );
};

export default AvifImage;
