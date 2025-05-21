import React from 'react';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import styles from '../Styles/Subscribe.module.css';

const Subscribe = ({ book }) => {
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

      <Box sx={{ flex: 1 }}>
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
        >
          <img
            src={
              book.fullybooked_image ||
              book.allbook_image ||
              book.nationalbookstore_image
            }
            alt={book.title}
            style={{
              width: '100%',
              maxHeight: '500px',
              objectFit: 'contain',
            }}
          />
        </Box>
      )}
    </Box>
  </Container>
</section>
  );
};

export default Subscribe;
