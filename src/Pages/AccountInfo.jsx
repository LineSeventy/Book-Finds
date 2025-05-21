import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';
import { Button, Typography, Box, Alert } from '@mui/material';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AccountInfo() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError('Error logging out. Please try again.');
    }
  };

  const handlePasswordReset = async () => {
    setMessage('');
    setError('');
    try {
      if (user?.email) {
        await sendPasswordResetEmail(auth, user.email);
        setMessage('Password reset email sent. Please check your inbox.');
      } else {
        setError('No email found for this account.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Alert severity="info">You are not logged in.</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Box
        data-aos="fade-up"
        sx={{
          width: '100%',
          maxWidth: 500,
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Account Information
        </Typography>
        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>

        <Button
          onClick={handlePasswordReset}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            fontWeight: 500,
            textTransform: 'none'
          }}
        >
          Reset Password
        </Button>

        <Button
          onClick={handleLogout}
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            fontWeight: 500,
            textTransform: 'none'
          }}
        >
          Log Out
        </Button>

        {message && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default AccountInfo;
