import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

function About() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          About Us
        </Typography>
        <Box>
          <Typography variant="body1" paragraph>
            Welcome to our platform! We aim to provide the best experience for our users by leveraging modern technologies and best practices.
          </Typography>
          <Typography variant="body1" paragraph>
            This application is built using ReactJS and Material UI, ensuring a responsive and intuitive interface across devices.
          </Typography>
          <Typography variant="body1" paragraph>
            Stay tuned for more features and updates as we continue to improve and grow.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default About;