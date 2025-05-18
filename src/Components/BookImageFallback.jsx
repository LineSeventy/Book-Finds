import React, { useState } from 'react';
import { CardMedia } from '@mui/material';
import lastFallback from "../Assets/NoImg.svg?url"; 
const fallback = '/fallback-book.png';

const BookImage = ({ book, className }) => {
  const sources = [
    book.fullybooked_image,
    book.nationalbookstore_image,
    book.allbooked_image,
    lastFallback
  ].filter(Boolean);

  const [imgIndex, setImgIndex] = useState(0);

  const handleError = () => {
    if (imgIndex < sources.length - 1) {
      setImgIndex(prev => prev + 1);
    } else {
      setImgIndex(-1); 
    }
  };

  const image = imgIndex === -1 ? fallback : sources[imgIndex];

  return (
 <CardMedia
      component="img"
      className={className}
      image={image}
      alt={book.fullybooked_title || 'Book Cover'}
      onError={handleError}
    />
  );
};

export default BookImage;
