import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'; // Import useParams to access the URL params
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent
} from '@mui/material';
import ImageWithFallback from '../Components/ImageFallBack'; 
import styles from '../Styles/BookDetail.module.css'; 

function BookDetail() {
  const { bookId } = useParams();  // Get the bookId from the URL
  const [book, setBook] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);  // State to track loading

  useEffect(() => {
    setBook(null); 
    setLoading(true);  // Set loading to true when the fetch starts
    console.log('Fetching book details for bookId:', bookId);
    fetch(`${import.meta.env.VITE_API_URL}/api/matched-books?id=${bookId}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data && data.length > 0) {
          setBook(data[0]);
          setDescription(data[0].description || 'Description not available');
        } else {
          console.error('No book found with the given bookId');
          setBook(null); // Set book to null if no data found
        }
      })
      .catch(err => {
        console.error('Error fetching book details:', err);
        setBook(null);  // In case of an error, set book to null
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the fetch finishes
      });
  }, [bookId]);

  if (loading) {
    return <Typography>Loading...</Typography>; // Show "Loading..." while fetching data
  }

  if (!book) {
    return <Typography>No book found</Typography>; // Show error if no book data is available
  }

  const parsePrice = (price) => {
    if (!price) return null;
    const parsed = parseFloat(price.replace(/[^\d.-]/g, ''));
    return isNaN(parsed) ? null : parsed;
  };

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Card className={styles.featuredCard}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: "none" }}>
            <CardContent
              className={styles.featuredCardContent}
              sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
            <Typography variant="h6" className={styles.bookSource}>
              {book.fullybooked_title || 'Title not available'}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {book.author ? `by ${book.author}` : 'Author unknown'}
            </Typography>

              <Typography sx={{ mt: 2 }}>
                {description}
              </Typography>
            </CardContent>

            <Box
              className={styles.imageWrapper}
            >
              <ImageWithFallback
                images={[
                  book.fullybooked_image || '',
                  book.allbook_image || '',
                  book.nationalbookstore_image || '',
                ]}
                alt={book.fullybooked_title || 'Book image'}
                height={400}
                width="100%"
                style={{ objectFit: 'contain', maxWidth: '100%' }}
              />

              <Box className={styles.overlay}>
                <Button className={styles.wishlistBtn}>
                  Add to Wishlist
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Price Comparison</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
          {[{
            name: 'AllBooked',
            price: parsePrice(book.allbooked_price),
            url: book.allbooked_url
          }, {
            name: 'National Bookstore',
            price: parsePrice(book.nationalbookstore_price),
            url: book.nationalbookstore_url
          }, {
            name: 'FullyBooked',
            price: parsePrice(book.fullybooked_price),
            url: book.fullybook_url
          }].map((source, idx) => (
            <Box key={idx} sx={{ flex: '1 1 30%', textAlign: 'center' }}>
              <Typography variant="body1">{source.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {source.price !== null ? `₱${source.price.toFixed(2)}` : 'Price not available'}
              </Typography>
              {source.url ? (
                <Button variant="outlined" href={source.url} target="_blank" rel="noreferrer" sx={{ mt: 1 }}>
                  View Price
                </Button>
              ) : (
                <Button variant="outlined" disabled sx={{ mt: 1 }}>
                  Not Available
                </Button>
              )}
            </Box>
          ))}
        </Box>

      </Box>
    </Container>
  );
}

export default BookDetail;
