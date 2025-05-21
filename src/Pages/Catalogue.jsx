import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  Container, Typography, Grid, Card, Button, Box, CircularProgress
} from '@mui/material';
import SortByOptions from '../Components/Sorting';
import styles from '../Styles/Catalogue.module.css';
import BookImage from '../Components/BookImageFallback';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Catalogue() {
  const [books, setBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const booksPerPage = 9;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const parsePrice = (price) => {
    if (!price) return null;
    return parseFloat(price.replace(/[^\d.-]/g, ''));
  };

  const fetchBooks = (page = 1) => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/matched-books?page=${page}&limit=${booksPerPage}`)
      .then(res => res.json())
      .then(data => {
        setBooks(data.books);
        setSortedBooks(data.books);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      })
      .catch(err => console.error('Fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

const handleSortChange = (sortBy) => {
  const getMatchCount = (book) => {
    return [
      parsePrice(book.allbooked_price),
      parsePrice(book.nationalbookstore_price),
      parsePrice(book.fullybooked_price)
    ].filter(p => p !== null).length;
  };

  let sorted;
  if (sortBy === 'A-Z') {
    sorted = [...books].sort((a, b) =>
      (a.fullybooked_title || '').localeCompare(b.fullybooked_title || '')
    );
  } else if (sortBy === 'Z-A') {
    sorted = [...books].sort((a, b) =>
      (b.fullybooked_title || '').localeCompare(a.fullybooked_title || '')
    );
  } else if (sortBy === 'least-expensive') {
    sorted = [...books].sort((a, b) =>
      Math.min(
        ...[parsePrice(a.allbooked_price), parsePrice(a.nationalbookstore_price), parsePrice(a.fullybooked_price)].filter(Boolean)
      ) -
      Math.min(
        ...[parsePrice(b.allbooked_price), parsePrice(b.nationalbookstore_price), parsePrice(b.fullybooked_price)].filter(Boolean)
      )
    );
  } else if (sortBy === 'most-expensive') {
    sorted = [...books].sort((a, b) =>
      Math.max(
        ...[parsePrice(b.allbooked_price), parsePrice(b.nationalbookstore_price), parsePrice(b.fullybooked_price)].filter(Boolean)
      ) -
      Math.max(
        ...[parsePrice(a.allbooked_price), parsePrice(a.nationalbookstore_price), parsePrice(a.fullybooked_price)].filter(Boolean)
      )
    );
  } else if (sortBy === 'most-matches') {
    sorted = [...books].sort((a, b) => getMatchCount(b) - getMatchCount(a));
  } else if (sortBy === 'fewest-matches') {
    sorted = [...books].sort((a, b) => getMatchCount(a) - getMatchCount(b));
  }

  setSortedBooks(sorted);
};


  const paddedBooks = [...sortedBooks];
  while (paddedBooks.length < booksPerPage) {
    paddedBooks.push(null);
  }

  const getCheapestPrice = (book) => {
    const prices = [
      parsePrice(book.allbooked_price),
      parsePrice(book.nationalbookstore_price),
      parsePrice(book.fullybooked_price)
    ].filter(p => p !== null);
    return prices.length > 0 ? Math.min(...prices) : null;
  };
  const getFallbackTitle = (book) =>
    book.nationalbookstore_title || book.fullybooked_title || book.allbook_title || 'Untitled Book';

  function ScrollTopButton() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 300 });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: 40,
          right: 20,
          zIndex: 1000,
        }}
        aria-label="scroll back to top"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}
  return (
    <Container className={styles.container}>


      <SortByOptions onSortChange={handleSortChange} />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px" width="100%">
          <CircularProgress />
        </Box>
      ) : (
<Grid container spacing={5} justifyContent="center">
  {paddedBooks.map((book, index) => (
    <Grid
      item
      key={book?.id || `placeholder-${index}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {book ? (
        <Link to={`/catalogue/${encodeURIComponent(book.id)}`} style={{ textDecoration: 'none' }}>
          <Card className={styles.card}>
            <BookImage book={book} className={styles.cardMedia} />
            <Box className={styles.cardBottom}>
              <Typography className={styles.cardTitle}>
                {getFallbackTitle(book)}
              </Typography>
            </Box>
          </Card>
        </Link>
      ) : (
        <div style={{ height: '100%' }}></div>
      )}
    </Grid>
  ))}
</Grid>

      )}

      <Box className={styles.pagination} mt={4}>
        <Button
          variant="contained"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || loading}
          className={styles.pageButton}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ alignSelf: 'center' }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || loading}
          className={styles.pageButton}
        >
          Next
        </Button>
      </Box>
      <ScrollTopButton />
    </Container>
  );
}

export default Catalogue;
