// Simplified frontend demo
import React, { useState } from 'react';
import axios from 'axios';

function Subscription() {
  const [status, setStatus] = useState('');
  
  const subscribe = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/subscribe', {
        planId: 1, // example plan
        userId: 123 // example user
      });

      setStatus(`Payment Intent Created: ${res.data.intentId}`);
      // Here you would redirect user to payment confirmation step using clientKey
    } catch (err) {
      setStatus('Error subscribing: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Subscribe to Basic Plan</h2>
      <button onClick={subscribe}>Subscribe ₱199</button>
      <p>{status}</p>
    </div>
  );
}

export default Subscription;
