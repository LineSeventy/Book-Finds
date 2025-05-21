import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import ImageWithFallback from '../Components/ImageFallBack'; 
import styles from '../Styles/BookDetail.module.css'; 
import { useAuth } from '../Context/Auth'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function BookDetail() {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const { handleAddToWishlist, wishlist } = useAuth();
const [showFullDesc, setShowFullDesc] = useState(false);
  const formatDescription = (text) => {
    return text
      .split(/\n|\r|\r\n/)
      .filter(paragraph => paragraph.trim() !== '')
      .map((paragraph, idx) => (
        <Typography
          key={idx}
          sx={{
            mt: idx === 0 ? 0 : 2,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            lineHeight: 1.5
          }}
          paragraph
        >
          {paragraph}
        </Typography>
      ));
  };
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleAdd = () => {
    if (!book) return;

    const item = {
      id: bookId,
      title: book.fullybooked_title,
      price: book.fullybooked_price || book.allbooked_price || book.nationalbookstore_price || '',
      image: book.fullybooked_image || book.allbook_image || book.nationalbookstore_image || '',
    };

    if (!wishlist.some(w => w.id === item.id)) {
      handleAddToWishlist(item);
    }
  };

useEffect(() => {
  const fetchBookDetails = async () => {
    setBook(null);
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/matched-books?id=${bookId}`);
      const data = await res.json();

      if (data && data.length > 0) {
        const bookData = data[0];
        setBook(bookData);

        // Fallback title logic
        const title =
          bookData.fullybooked_title ||
          bookData.allbook_title ||
          bookData.nationalbookstore_title ||
          'Unknown Title';

        // Fetch Google Books description
        try {
          const gRes = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=AIzaSyAWkn0w6HyiO7uphbXhXkq1wK3EWc7Ioc8`
          );
          const gData = await gRes.json();
          const desc = gData.items?.[0]?.volumeInfo?.description || 'Description not available';
          setDescription(desc);
        } catch (gErr) {
          console.error('Error fetching description from Google Books:', gErr);
          setDescription('Description not available');
        }
      } else {
        setBook(null);
        setDescription('Description not available');
      }
    } catch (err) {
      console.error('Error fetching book details:', err);
      setBook(null);
      setDescription('Error loading description');
    } finally {
      setLoading(false);
    }
  };

  fetchBookDetails();
}, [bookId]);


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

  if (!book) {
    return <Typography sx={{ p: 4 }}>No book found</Typography>;
  }

  const parsePrice = (price) => {
    if (!price) return null;
    const parsed = parseFloat(price.replace(/[^\d.-]/g, ''));
    return isNaN(parsed) ? null : parsed;
  };

return (
  <Box
    sx={{
      minHeight: '100vh',
      p: { xs: 2, md: 4 },
      backgroundColor: '#f9f9f9',
    }}
  >
    <Box
      data-aos="fade-up"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {/* Left Image */}
      <Box
        sx={{
          flex: '1 1 40%',
          maxWidth: { xs: '100%', md: '40%' },
          position: 'relative',
        }}
      >
        <ImageWithFallback
          images={[
            book.fullybooked_image || '',
            book.allbook_image || '',
            book.nationalbookstore_image || '',
          ]}
          alt={book.fullybooked_title || 'Book image'}
          height={500}
          width="100%"
          style={{ objectFit: 'contain', width: '100%' }}
        />

        <Box className={styles.overlay}>
          <Button
            className={styles.wishlistBtn}
            onClick={handleAdd}
            disabled={wishlist.some(w => w.id === bookId)}
          >
            {wishlist.some(w => w.id === bookId) ? 'In Wishlist' : 'Add to Wishlist'}
          </Button>
        </Box>
      </Box>

      {/* Right Content */}
      <Box
        sx={{
          flex: '1 1 60%',
          maxWidth: { xs: '100%', md: '60%' },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          {book.fullybooked_title || book.allbook_title || book.nationalbookstore_title || 'Title not available'}
        </Typography>

 <Box>
    {showFullDesc
      ? formatDescription(description)
      : formatDescription(
          (isMobile
            ? description.slice(0, 200)
            : description.slice(0, 400)) + (description.length > (isMobile ? 200 : 400) ? '...' : '')
        )}

    {description.length > (isMobile ? 200 : 400) && (
      <Button
        onClick={() => setShowFullDesc(prev => !prev)}
        size="small"
        sx={{ mt: 1 }}
      >
        {showFullDesc ? 'View Less' : 'View More'}
      </Button>
    )}
  </Box>
      </Box>
    </Box>

    {/* Price Comparison Section */}
    <Box sx={{ mt: 6 }} data-aos="fade-up">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Price Comparison
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {[
          {
            name: 'AllBooked',
            price: parsePrice(book.allbooked_price),
            url: book.allbooked_url,
          },
          {
            name: 'National Bookstore',
            price: parsePrice(book.nationalbookstore_price),
            url: book.nationalbookstore_url,
          },
          {
            name: 'FullyBooked',
            price: parsePrice(book.fullybooked_price),
            url: book.fullybook_url,
          },
        ].map((source, idx) => (
          <Box
            key={idx}
            sx={{
              flex: { xs: '1 1 100%', sm: '1 1 30%' },
              textAlign: 'center',
              backgroundColor: '#fff',
              p: 2,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Typography variant="body1">{source.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {source.price !== null ? `₱${source.price.toFixed(2)}` : 'Price not available'}
            </Typography>
            <Button
              variant="outlined"
              href={source.url}
              target="_blank"
              rel="noreferrer"
              sx={{ mt: 1 }}
              disabled={!source.url}
            >
              {source.url ? 'View Price' : 'Not Available'}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
)};


export default BookDetail;
