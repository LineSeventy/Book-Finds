import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import {Link} from "react-router"
function Error() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h3" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Box mt={3}>
        <Button component={Link} to="/" variant="contained" color="primary">
        Go Home
      </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Error;
