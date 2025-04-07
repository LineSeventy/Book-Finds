import React, { useState } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import styles from '../Styles/SubscriptionPayment.module.css';

import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';

function SubscriptionPayment() {
  const [plan, setPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const prices = {
    monthly: 199,
    yearly: 1999,
  };

  const handlePlanChange = (event, newPlan) => {
    if (newPlan !== null) setPlan(newPlan);
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setStatus('');

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      const amount = prices[plan];

      // Call backend to create payment intent
      const response = await axios.post('{import.meta.env.VITE_API_URL}/api/create-payment', {
        amount,
      });

      const paymentIntent = response.data.data;

      // Save to Firestore
      await addDoc(collection(db, 'subscriptions'), {
        uid: user?.uid || null,
        email: user?.email || null,
        plan,
        amount,
        paymentIntentId: paymentIntent.id,
        status: 'pending',
        createdAt: Timestamp.now(),
      });

      setStatus(`Subscribed to ${plan} plan. Payment pending...`);
    } catch (error) {
      console.error(error);
      setStatus('Error processing subscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className={styles.container} elevation={3}>
      <Typography variant="h5" gutterBottom align="center">
        Choose Your Plan
      </Typography>

      <ToggleButtonGroup
        value={plan}
        exclusive
        onChange={handlePlanChange}
        fullWidth
        color="primary"
        sx={{ marginBottom: 2 }}
      >
        <ToggleButton value="monthly">₱???? / mo</ToggleButton>
        <ToggleButton value="yearly">₱???? / yr</ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubscribe}
        fullWidth
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Subscribe Now'}
      </Button>

      {status && <Typography className={styles.status}>{status}</Typography>}
    </Paper>
  );
}

export default SubscriptionPayment;
