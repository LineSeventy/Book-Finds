import React from 'react';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import styles from '../Styles/Subscribe.module.css';

const Subscribe = () => {
  return (
    <section className={styles.subscribeSection}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <div className={styles.titleElement}>
                  <Typography variant="h5" className={styles.sectionTitle}>
                  Subscribe Now to Get Regular Updates
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className={styles.subscribeContent}>

                  <form className={styles.form}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter your email address here"
                      className={styles.input}
                      variant="outlined"
                    />
                    <Button variant="contained" className={styles.subscribeButton} endIcon={<i className="icon icon-send" />}>
                      Send
                    </Button>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Subscribe;
