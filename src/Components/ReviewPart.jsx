import React from 'react';
import { Box, Card, CardContent, Typography, Rating, Grid } from '@mui/material';
import reviews from '../Json/reviews.json';

const ReviewPart = () => {
  // Create a shuffled copy of the reviews array, then pick first 4
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
        px: 3,
        padding: "5rem",
        backgroundColor: '#FFBFBF',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 20,
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: "10rem",
          marginRight: "10rem",
          
        }}
      >
        <Box
          sx={{
            flex: '0 0 220px',
            display: 'flex',
            alignItems: 'center',
            height: 320,
          }}
        >
          <Typography variant="h4" 

          sx={{ fontWeight: 600 }}>
            What People Are Saying
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ flex: 1, justifyContent: 'flex-start' }}>
          {displayedReviews.map((item, index) => (
            <Grid
              item
              key={index}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  p: 2,
                  backgroundColor: '#fafafa',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 320,
                  minHeight: 150,
                  textAlign: 'center',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant='h6'
                    textAlign={'center'}
                    marginBottom={"1rem"}
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
