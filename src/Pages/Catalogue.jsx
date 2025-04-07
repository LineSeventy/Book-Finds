import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Container, Typography, Grid, Card, CardMedia, Button, Box } from '@mui/material';
import SortByOptions from '../Components/Sorting';
import styles from '../Styles/Catalogue.module.css';

function Catalogue() {
  const [books, setBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const booksPerPage = 9;

  const parsePrice = (price) => parseFloat(price.replace(/[^\d.-]/g, ''));

  const fetchBooks = (page = 1) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/matched-books?page=${page}&limit=${booksPerPage}`)
      .then(res => res.json())
      .then(data => {
        const seenTitles = new Set();
        const uniqueBooks = data.books.filter(book => {
          const title = book.fullybooked_title?.trim().toLowerCase();
          if (seenTitles.has(title)) return false;
          seenTitles.add(title);
          return true;
        });
      
        setBooks(uniqueBooks);
        setSortedBooks(uniqueBooks);
        setCurrentPage(data.page); 
        setTotalPages(data.totalPages);
      })
      .catch(err => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handleSortChange = (sortBy) => {
    let sorted;
    if (sortBy === 'A-Z') {
      sorted = [...books].sort((a, b) => a.fullybooked_title.localeCompare(b.fullybooked_title));
    } else if (sortBy === 'least-expensive') {
      sorted = [...books].sort((a, b) =>
        Math.min(parsePrice(a.allbooked_price), parsePrice(a.nationalbookstore_price), parsePrice(a.fullybooked_price)) -
        Math.min(parsePrice(b.allbooked_price), parsePrice(b.nationalbookstore_price), parsePrice(b.fullybooked_price))
      );
    } else if (sortBy === 'most-expensive') {
      sorted = [...books].sort((a, b) =>
        Math.max(parsePrice(b.allbooked_price), parsePrice(b.nationalbookstore_price), parsePrice(b.fullybooked_price)) -
        Math.max(parsePrice(a.allbooked_price), parsePrice(a.nationalbookstore_price), parsePrice(a.fullybooked_price))
      );
    }
    setSortedBooks(sorted);
  };

  const getCheapestPrice = (book) => {
    return Math.min(
      parsePrice(book.allbooked_price),
      parsePrice(book.nationalbookstore_price),
      parsePrice(book.fullybooked_price)
    );
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h3" gutterBottom paddingBottom={"1rem"}>
        Catalogue
      </Typography>
      <SortByOptions onSortChange={handleSortChange} />
      <Grid container spacing={5}>
        {sortedBooks.map(book => (
          <Grid item xs={12} sm={4} key={book.id}>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                className={styles.cardMedia}
                image={book.fullybooked_image}
                alt={book.fullybooked_title}
              />
              <div className={styles.cardContent}>
                <Typography className={styles.cardTitle} noWrap>{book.fullybooked_title}</Typography>
                <Typography className={styles.cardPrice}>
                  Price: ₱{getCheapestPrice(book).toFixed(2)}
                </Typography>
                <Box className={styles.buttonBox}>
                  <Link to={`/catalogue/${encodeURIComponent(book.id)}`}>
                    <Button variant="outlined" color="primary" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </Box>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box className={styles.pagination}>
        <Button
          variant="contained"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
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
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default Catalogue;
