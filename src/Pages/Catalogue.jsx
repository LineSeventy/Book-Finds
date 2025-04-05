import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

function Catalogue() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/catalogue')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {items.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              alt={item.title}
            />
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography color="text.secondary">${item.price}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Catalogue;
