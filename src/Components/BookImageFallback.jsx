import React, { useState } from 'react';
import { CardMedia } from '@mui/material';

const fallback = '/fallback-book.png';

const BookImage = ({ book, className }) => {
  const sources = [
    book.fullybooked_image,
    book.nationalbookstore_image,
    book.allbooked_image,
  ].filter(Boolean);

  const [imgIndex, setImgIndex] = useState(0);

  const handleError = () => {
    if (imgIndex < sources.length - 1) {
      setImgIndex(prev => prev + 1);
    } else {
      setImgIndex(-1); // triggers fallback
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
