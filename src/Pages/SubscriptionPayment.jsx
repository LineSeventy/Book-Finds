import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
// import { supabase } from '../supabaseClient'; 
import styles from '../Styles/SubscriptionPayment.module.css';
import AOS from 'aos';

import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';

function SubscriptionPayment() {
  const [plan, setPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const prices = {
    monthly: 100,
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

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/create-payment`, {
        amount,
      });

      const paymentIntent = response.data.data;

      // Supabase insertion temporarily commented out:
      /*
      const { error } = await supabase.from('subscriptions').insert([
        {
          user_id: user?.uid || null,
          email: user?.email || null,
          plan,
          amount,
          paymongo_subscription_id: paymentIntent.id,
          status: 'pending',
        },
      ]);
      if (error) throw error;
      */

      setStatus(`Subscribed to ₱${amount} ${plan} plan. Payment pending...`);
    } catch (error) {
      console.error(error);
      setStatus('Error processing subscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.page}>
      <Paper
        className={styles.container}
        elevation={4}
        data-aos="fade-up"
        sx={{
          width: '100%',
          maxWidth: 600,
          padding: isMobile ? '1.5rem' : '2.5rem',
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'h4'} align="center" gutterBottom>
          Subscription Plans
        </Typography>

        <Box className={styles.planBox}>
          <Typography variant="h6">Freemium (Free)</Typography>
          <ul>
            <li>Compare book prices across multiple e-commerce sites</li>
            <li>10 searches per day</li>
          </ul>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box className={styles.planBox}>
          <Typography variant="h6">Premium - ₱100 / month</Typography>
          <ul>
            <li>Unlimited book price searches</li>
            <li>Price alerts for books of interest</li>
            <li>Top deals of the week dashboard</li>
          </ul>

          <ToggleButtonGroup
            value={plan}
            exclusive
            onChange={handlePlanChange}
            fullWidth
            color="primary"
            sx={{ mt: 2 }}
          >
            <ToggleButton value="monthly" className={styles.toggle}>
              ₱100 / mo
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubscribe}
            fullWidth
            disabled={loading}
            className={styles.subscribeBtn}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Subscribe Now'}
          </Button>

          {status && <Typography className={styles.status}>{status}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
}

export default SubscriptionPayment;
