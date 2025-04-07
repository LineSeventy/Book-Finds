import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import styles from '../Styles/Quote.module.css';

const QuoteSection = () => {
  return (
    <section className={styles.quotationSection} >
      <Container>
        <Box className={styles.innerContent}>
          <Typography variant="h5" className={styles.title}>
            Quote of the day
          </Typography>
          <blockquote className={styles.blockquote}>
            <q className={styles.quoteText}>
              “The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”
            </q>
            <div className={styles.author}>Dr. Seuss</div>
          </blockquote>
        </Box>
      </Container>
    </section>
  );
};

export default QuoteSection;
