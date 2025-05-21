import React from 'react';
import styles from '../Styles/Footer.module.css';
import { Container, Typography, Link, Box, useTheme, Grid } from '@mui/material';
import logo from "../Assets/Logo.png";
import { NavLink } from "react-router-dom"; // fixed import

const Footer = () => {
  const theme = useTheme();

  return (
    <footer className={styles.footer}>
      <Container maxWidth={false} sx={{ width: '100%' }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          className={styles.footerTop}
        >
          {/* Logo */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Box component={NavLink} to="/" className={styles.logo}>
              <img src={logo} alt="BOOKFINDS" className={styles.logoImage} />
            </Box>
          </Grid>

          {/* Nav Links */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              alignItems="center"
              justifyContent="center"
              gap={3}
              className={styles.footerNavLinks}
            >
              <Link href="/" className={styles.navLink} underline="hover">Home</Link>
              <Link href="/about" className={styles.navLink} underline="hover">About Us</Link>
              <Link href="/catalogue" className={styles.navLink} underline="hover">Books</Link>
              <Link href="/subscription" className={styles.navLink} underline="hover">Subscription</Link>
            </Box>
          </Grid>

          {/* Optional Empty Column for symmetry */}
          <Grid item xs={false} md={4} />
        </Grid>
      </Container>

      <Box className={styles.footerBottom}>
        <Container maxWidth={false} sx={{ width: '100%' }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            textAlign="center"
          >
            <Typography variant="body2">© 2025 Cavanssly. All rights reserved.</Typography>
            <Box className={styles.socialLinks} mt={1}>
              <Link href="#" aria-label="Facebook"><i className="icon icon-facebook" /></Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
