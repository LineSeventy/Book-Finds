import React, { useState } from 'react';
import { CardMedia } from '@mui/material';

const ImageWithFallback = ({ images = [], alt, height = 200, width = '100%', style }) => {
  const [index, setIndex] = useState(0);

  const handleError = () => {
    if (index < images.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  if (!images.length) return null;

  return (
    <CardMedia
      component="img"
      height={height}
      width={width}
      image={images[index]}
      alt={alt}
      onError={handleError}
      sx={{ objectFit: 'contain', ...style }}
    />
  );
};

export default ImageWithFallback;
