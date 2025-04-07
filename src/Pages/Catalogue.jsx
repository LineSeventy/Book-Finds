import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box
} from '@mui/material';

function Catalogue() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h3" gutterBottom paddingBottom={"1rem"}>
        Catalogue
      </Typography>
      <Grid container spacing={5}>
        {books.slice(0, 25).map(book => (
          <Grid
            size={4}
            key={book.id}
          >
            <Card

              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '20rem',
                width:"20rem",

              }}
            >
              <CardMedia
                component="img"
                sx={{

                  objectFit: 'contain',
                  height: 150
                }}
                image={book.image}
                alt={book.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${book.price}
                </Typography>
              </CardContent>
              <Box sx={{ padding: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  href={book.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Catalogue;
