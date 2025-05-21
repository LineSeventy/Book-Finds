import React, { useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import styles from '../Styles/Subscribe.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Subscribe = ({ book }) => {
  
useEffect(() => {
  AOS.init({
    duration: 1000, 
    once: true,    
  });
}, []);
  return (
<section className={styles.subscribeSection}>
  <Container>
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    py: 6,
  }}
>
  {/* LEFT SIDE: Text and form */}
  <Box sx={{ flex: 1 }} data-aos="fade-right">
    <Typography variant="h5" className={styles.sectionTitle} sx={{ mb: 2 }}>
      Subscribe Now to Get Regular Updates
    </Typography>
    <form className={styles.form}>
      <TextField
        fullWidth
        size="small"
        placeholder="Enter your email address here"
        className={styles.input}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        className={styles.subscribeButton}
        endIcon={<i className="icon icon-send" />}
      >
        Send
      </Button>
    </form>
  </Box>

  {/* RIGHT SIDE: Book Image */}
  {book && (
    <Box
      sx={{
        flex: 1,
        maxWidth: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      data-aos="fade-left"
    >
      <img
        src={
          book.fullybooked_image ||
          book.allbook_image ||
          book.nationalbookstore_image
        }
        alt={book.title}
        className={styles.bookImage}
      />
    </Box>
  )}
</Box>

  </Container>
</section>
  );
};

export default Subscribe;
