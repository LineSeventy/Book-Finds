
import React from 'react';
import styles from '../Styles/Footer.module.css';
import { Container, Typography, Link, Box, useTheme } from '@mui/material';
import logo from "../Assets/Logo.png"

const Footer = () => {
  const theme = useTheme();

  return (
    <footer className={styles.footer}>
      <Container maxWidth={false} sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" py={3} className={styles.footerTop}>
          <Box className={styles.logo}>
            <img src={logo} alt="logo" className={styles.logoImage} />
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" gap={4} className={styles.footerNavLinks} flexWrap="wrap">
            <Link href="/" className={styles.navLink} underline="hover">Home</Link>
            <Link href="/about" className={styles.navLink} underline="hover">About Us</Link>
            <Link href="/catalogue" className={styles.navLink} underline="hover">Books</Link>
            <Link href="/subscription" className={styles.navLink} underline="hover">Subscription</Link>
          </Box>
        </Box>
      </Container>

      <Box className={styles.footerBottom}>
        <Container maxWidth={false} sx={{ width: '100%' }}>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center">
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
