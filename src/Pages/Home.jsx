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
import AOS from 'aos';
import 'aos/dist/aos.css';

import ImageWithFallback from '../Components/ImageFallBack';
import styles from '../Styles/Home.module.css';
import Subscribe from '../Components/Subscribe'; 
import QuoteSection from '../Components/Quote';
import { useAuth } from '../Context/Auth';
import { Link } from 'react-router';
import lastFallback from "../Assets/NoImg.svg?url"; 
import nbs from "../Assets/NBSLogo.png";
import bkl from "../Assets/bfl_header_360x.avif";
import bfb from "../Assets/fullybooked-logo.png";
import ReviewPart from '../Components/ReviewPart';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const { handleAddToWishlist } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/matched-books`);
        const contentType = res.headers.get('content-type');

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Server error: ${res.status} - ${errorText}`);
        }

        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
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

  useEffect(() => {
    AOS.refresh();
  }, [books]);

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
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9', 
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
     swipeToSlide: true, 
      touchMove: true,  
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const getFallbackTitle = (book) =>
    book.nationalbookstore_title || book.fullybooked_title || book.allbook_title || 'Untitled Book';

  if (!books.length && !loading) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography variant="h5" textAlign="center">No books found.</Typography>
      </Container>
    );
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ marginBottom: "10rem" }}>
      {firstBook && (
        <Box sx={{ mb: 10 }} data-aos="zoom-in">
          <Card className={styles.featuredCard} sx={{ p: { xs: 2, sm: 4 } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: { xs: 4, md: 8 },
                minHeight: { xs: 'auto', md: '50rem' },
              }}
            >
              <Box sx={{ flex: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 400 } }}>
                  <ImageWithFallback
                    images={[firstBook.fullybooked_image, firstBook.allbook_image, firstBook.nationalbookstore_image, lastFallback]}
                    alt={firstBook.title}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </Box>
              </Box>
              <CardContent className={styles.featuredCardContent} sx={{ flex: 1 }}>
                <Typography variant="h2" className={styles.bookSource} sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem' }, textAlign: { xs: 'center', md: 'left' } }}>
                  {getFallbackTitle(firstBook)}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {description.length > 300 ? `${description.slice(0, 300)}...` : description || 'Loading description...'}
                </Typography>
                <Link to={`/catalogue/${encodeURIComponent(firstBook.id)}`} style={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    sx={{ mt: 3, width: { xs: '100%', sm: 'auto' }, alignSelf: { xs: 'center', md: 'flex-start' } }}
                  >
                    Compare
                  </Button>
                </Link>
              </CardContent>
            </Box>
          </Card>
        </Box>
      )}

      <Box sx={{ textAlign: 'center', mb: 20 }}>
        <Typography variant="h3" data-aos="fade-right" sx={{ mb: 5 }}>
          Sources
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <img src={nbs} alt="National Book Store" data-aos="fade" className={styles.logoImage} />
          <img src={bfb} alt="Fully Booked" data-aos="fade" className={styles.logoImage} />
          <img src={bkl} alt="Books for Less" data-aos="fade" className={styles.logoImage} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h4"
          className={styles.bookSource}
          data-aos="fade-up"
          sx={{ textAlign: "center", marginBottom: "2rem", fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
        >
          Books Catalogue
        </Typography>

        <Box sx={{ overflowX: 'hidden', width: '100%' }}>
          <Slider {...sliderSettings}>
            {remainingBooks.map((book, index) => (
              <Box
                key={crypto.randomUUID()}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                sx={{ px: 1, width: '100%', boxSizing: 'border-box' }}
              >
                <Card
                  className={styles.card}
                  sx={{
                    height: 460,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    px: 1,
                    border: '2px solid #ccc',
                    borderRadius: 3,
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    marginBottom: "5rem",
                    marginTop: "5rem",
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                      borderColor: '#999',
                    },
                  }}
                >
                  <CardContent className={styles.cardContent}>
                    <Typography variant="h6" className={styles.title}>
                      {getFallbackTitle(book)}
                    </Typography>
                  </CardContent>
                  <Box className={styles.imageWrapper}>
                    <ImageWithFallback
                      images={[
                        book.fullybooked_image,
                        book.allbook_image,
                        book.nationalbookstore_image
                      ]}
                      alt={book.title}
                      height={300}
                      width={250}
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        display: 'block',
                        margin: '0 auto',
                      }}
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
              </Box>
            ))}
          </Slider>
        </Box>

        <ReviewPart />
        <Subscribe book={firstBook} />
      </Box>
    </Container>
  );
};

export default Home;
