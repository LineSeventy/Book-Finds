import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, Rating, Grid } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import reviews from '../Json/reviews.json';
import styles from '../Styles/ReviewPart.module.css'; 

const ReviewPart = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const getRandomReviews = (arr, count) => {
    const shuffled = arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled.slice(0, count);
  };

  const displayedReviews = getRandomReviews(reviews, 4);

  return (
    <Box
      sx={{
        mt: 10,
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, sm: 6, md: 8 },
        backgroundColor: '#FFBFBF',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 10 },
          alignItems: { xs: 'flex-start', md: 'center' },
        }}
      >
        <Box
          sx={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            height: { xs: 'auto', md: 320 },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            What People Are Saying
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {displayedReviews.map((item, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                data-aos="fade-up"
                className={styles.card}
                sx={{
                  borderRadius: 3,
                  p: 2,
                  backgroundColor: '#fafafa',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%',
                  maxWidth: 320,
                  minHeight: 150,
                  textAlign: 'center',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    marginBottom="1rem"
                  >
                    Anonymous User
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontStyle: 'italic', color: '#333' }}
                  >
                    "{item.review}"
                  </Typography>
                  <Rating
                    name="read-only"
                    value={item.rating}
                    readOnly
                    precision={0.5}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ReviewPart;
