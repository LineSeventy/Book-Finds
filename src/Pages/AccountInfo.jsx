import React from 'react';
import { useAuth } from '../Context/Auth';
import { Button, Typography, Container, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function AccountInfo() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return <Typography>You are not logged in.</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ p: 4, border: '1px solid #ccc', borderRadius: 4 }}>
        <Typography variant="h5" gutterBottom>Account Information</Typography>
        <Typography>Email: {user.email}</Typography>
        <Button onClick={handleLogout} variant="outlined" color="secondary" sx={{ mt: 2 }}>
          Log Out
        </Button>
      </Box>
    </Container>
  );
}

export default AccountInfo;
