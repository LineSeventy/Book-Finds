import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Button
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageWithFallback from '../Components/ImageFallBack';
import styles from '../Styles/Home.module.css';
import Subscribe from '../Components/Subscribe'; 
import QuoteSection from '../Components/Quote';
import { useAuth } from '../Context/Auth';
import {Link} from "react-router"

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const { handleAddToWishlist } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log(import.meta.env.VITE_API_URL); 
        const res = await fetch(`http://localhost:5000/api/matched-books`);

        const contentType = res.headers.get('content-type');
  
        if (!res.ok) {
          const errorText = await res.text();
          console.log("Error Response Text:", errorText); // Log the response text
          throw new Error(`Server error: ${res.status} - ${errorText}`);
        }
  
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.log("Invalid Response Text:", text); // Log the invalid response
          throw new Error(`Invalid JSON response: ${text}`);
        }
  
        const data = await res.json();
        const shuffled = [...data.books].sort(() => 0.5 - Math.random());
        setBooks(shuffled.slice(0, 10));
  
      } catch (err) {
        console.error('Failed to fetch books:', err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBooks();
  }, []);
  

  const [firstBook, ...remainingBooks] = books;

  useEffect(() => {
    if (!books.length) return;

    const firstBook = books[0];

    const fetchDescription = async () => {
      if (!firstBook?.title) return;

      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(firstBook.title)}&key=AIzaSyAWkn0w6HyiO7uphbXhXkq1wK3EWc7Ioc8`
        );
        const data = await res.json();

        const desc = data.items?.[0]?.volumeInfo?.description || 'No description found.';
        setDescription(desc);
      } catch (err) {
        console.error('Failed to fetch description:', err.message);
        setDescription('Error loading description.');
      }
    };

    fetchDescription();
  }, [books]);

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (!books.length && !loading) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography variant="h5" textAlign="center">
          No books found.
        </Typography>
      </Container>
    );
  }
  return (
    <Container sx={{ mt: 6, marginBottom: "10rem" }}>
      {firstBook && (
        <Box sx={{ mb: 4 }}>
          <Card className={styles.featuredCard} sx={{}}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: "none" }}>
              <CardContent
                className={styles.featuredCardContent}
                sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <Typography variant="h6" className={styles.bookSource}>
                  {firstBook.fullybooked_title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {firstBook.author && `by ${firstBook.author}`}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                {description.length > 300 ? `${description.slice(0, 300)}...` : description || 'Loading description...'}
              </Typography>
              <Link to={`/catalogue/${encodeURIComponent(firstBook.id)}`}>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Compare
              </Button>
            </Link>
              </CardContent>

              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ImageWithFallback
                  images={[
                    firstBook.fullybooked_image,
                    firstBook.allbook_image,
                    firstBook.nationalbookstore_image,
                  ]}
                  alt={firstBook.title}
                  height={400}
                  width="100%"
                  style={{ objectFit: 'contain', maxWidth: '100%' }}
                />
              </Box>
            </Box>
          </Card>
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h4"
          className={styles.bookSource}
          sx={{ textAlign: "center", marginBottom: "2rem" }}
        >
          Books Catalogue
        </Typography>

        <Slider {...sliderSettings}>
          {remainingBooks.map((book) => (
            <Container key={crypto.randomUUID()} sx={{ px: 2 }}>
              <Card
                className={styles.card}
                sx={{
                  height: 460,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'none',
                  border: 'none',
                  borderRadius: 3,
                  px: 1,
                }}
              >
                <CardContent className={styles.cardContent}>
                  <Typography variant="h6" className={styles.title}>
                    {book.nationalbookstore_title}
                  </Typography>
                </CardContent>

                <Box className={styles.imageWrapper}>
                  <ImageWithFallback
                    images={[
                      book.fullybooked_image,
                      book.allbook_image,
                      book.nationalbookstore_image,
                    ]}
                    alt={book.title}
                    height={300}
                    width="100%"
                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                  />
                  <Box className={styles.overlay}>
                    <Button
                      className={styles.wishlistBtn}
                      variant="contained"
                      size="small"
                      onClick={() => handleAddToWishlist(book)}
                    >
                      Add to Wishlist
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Container>
          ))}
        </Slider>

        <QuoteSection />
        <Subscribe />
      </Box>
    </Container>
  );
};

export default Home;
