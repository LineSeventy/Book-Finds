import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper
} from '@mui/material';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import styles from "../Styles/SignUp.module.css";

function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setVerificationSent(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      setSuccess('Account created! A verification email has been sent.');
      setVerificationSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResendVerification = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload(); // Refresh user
      await sendEmailVerification(auth.currentUser);
      setSuccess('Verification email resent. Please check your inbox.');
    } else {
      setError('User not available for verification.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingBottom: "5rem" }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          mt: { xs: 4, sm: 8 },
          borderRadius: 4,
          transition: "transform 0.3s ease",
          '&:hover': { transform: "scale(1.02)" }
        }}
        data-aos="fade-up"
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              transition: "background-color 0.3s",
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            Sign Up
          </Button>

          {verificationSent && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleResendVerification}
              sx={{
                mt: 1,
                fontSize: '0.95rem',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'secondary.light',
                },
              }}
            >
              Resend Verification Email
            </Button>
          )}



          <Button
            variant="text"
            color="secondary"
            fullWidth
            onClick={() => navigate('/create')}
            sx={{
              mt: 1,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              py: 1.2,
              borderRadius: 2,
              transition: "all 0.3s ease",
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
          >
            Back to Login
          </Button>

          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateAccount;
