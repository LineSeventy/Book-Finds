import React, { useState } from 'react';
import { CardMedia } from '@mui/material';
import lastFallback from "../Assets/NoImg.svg?url"; 
const ImageWithFallback = ({ images = [], alt, height = 200, width = '100%', style }) => {
  const [index, setIndex] = useState(0);
 const fullList = [...images.filter(Boolean), lastFallback];
const handleError = () => {
    if (index < fullList.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

if (!fullList.length) return null;

return (
    <CardMedia
      component="img"
      height={height}
      width={width}
      image={fullList[index]}
      alt={alt}
      onError={handleError}
      sx={{ objectFit: 'contain', ...style }}
    />
  );
};

export default ImageWithFallback;
