import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to Our App
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" paragraph>
            Discover an amazing experience built with ReactJS and Material UI. Navigate through the app using the menu above and explore features like user authentication, profile management, and more.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button variant="contained" color="primary" href="/login">
              Login
            </Button>
            <Button variant="outlined" color="primary" href="/about">
              Learn More
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;
