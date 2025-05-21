import React from 'react';
import styles from '../Styles/Footer.module.css';
import { Container, Typography, Link, Box, useTheme } from '@mui/material';
import logo from "../Assets/Logo.png";
import { NavLink } from "react-router";

const Footer = () => {
  const theme = useTheme();

  return (
    <footer className={styles.footer}>
      <Box sx={{ width: '100%', py: 4 }}>
        <Container
          maxWidth={false}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* Left: Logo */}
          <Box
            component={NavLink}
            to="/"
            className={styles.logo}
            sx={{
              mb: { xs: 2, md: 0 },
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <img src={logo} alt="BOOKFINDS" className={styles.logoImage} />
          </Box>

          {/* Center: Nav Links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              flexGrow: 1,
            }}
            className={styles.footerNavLinks}
          >
            <Link href="/" className={styles.navLink} underline="hover">Home</Link>
            <Link href="/about" className={styles.navLink} underline="hover">About Us</Link>
            <Link href="/catalogue" className={styles.navLink} underline="hover">Books</Link>
            <Link href="/subscription" className={styles.navLink} underline="hover">Subscription</Link>
          </Box>

          {/* Right: Empty space for symmetry (if needed) */}
          <Box sx={{ width: { xs: 0, md: '160px' } }} />
        </Container>
      </Box>

      {/* Footer Bottom */}
      <Box className={styles.footerBottom} sx={{ py: 2 }}>
        <Container maxWidth={false} sx={{ width: '100%' }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            textAlign="center"
          >
            <Typography variant="body2">© 2025 Cavanssly. All rights reserved.</Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
