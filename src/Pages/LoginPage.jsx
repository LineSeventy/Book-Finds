import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Link} from "react-router"
import styles from "../Styles/LoginPage.module.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

function LoginPage() {
  useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Logged in successfully!');
      console.log('Email User:', userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setError('');
    setSuccess('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      setSuccess('Logged in with Google!');
      console.log('Google User:', result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  // Setup reCAPTCHA for phone
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {},
        },
        auth
      );
    }
  };

  // Handle sending OTP
  const handleSendOtp = async () => {
    setError('');
    setSuccess('');

    try {
      setupRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setIsOtpSent(true);
      setSuccess('OTP sent to phone');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async () => {
    setError('');
    setSuccess('');

    try {
      const result = await window.confirmationResult.confirm(otp);
      setSuccess('Phone login successful!');
      console.log('Phone User:', result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{paddingBottom:"5rem"}}>
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 4 }} data-aos="fade-in">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {/* Email/Password Login */}
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
<Button
  type="submit"
  variant="contained"
  color="primary"
  fullWidth
  className={styles.button}
>
  Log In
</Button>

        </Box>


<Button
  onClick={handleGoogleLogin}
  variant="outlined"
  color="secondary"
  fullWidth
  className={styles.outlinedButton}
>
  Sign in with Google
</Button>


        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1234567890"
        />
        {!isOtpSent ? (
<Button
  onClick={handleSendOtp}
  variant="outlined"
  color="primary"
  fullWidth
  className={styles.outlinedButton}
>
  Send OTP
</Button>
        ) : (
          <>
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
<Button
  onClick={handleVerifyOtp}
  variant="contained"
  color="primary"
  fullWidth
  className={styles.button}
>
  Verify OTP
</Button>
          </>
        )}
                <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/SignUp" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Sign up here
          </Link>
        </Typography>
        {/* Error and Success Messages */}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}

        {/* Recaptcha Container */}
        <div id="recaptcha-container"></div>
      </Paper>
    </Container>
  );
}

export default LoginPage;
