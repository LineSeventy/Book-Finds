import React from 'react';
import styles from '../Styles/Footer.module.css';
import { Container, Grid, Typography, Link, Box, useTheme } from '@mui/material';
import logo from "../Assets/Logo.png"
const Footer = () => {
  const theme = useTheme();

  return (
    <footer className={styles.footer}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className={styles.brand}>
              <img src={logo} alt="logo" className={styles.logo} />

            </div>
            <Typography variant="body2" color="textSecondary" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis sed ptibus libero lectus nonet psryroin.
              </Typography>s
          </Grid>

          {[
            {
              title: 'About Us',
              links: ['Vision', 'Service terms', 'Donate'],
            },
            {
              title: 'Discover',
              links: ['Home', 'Books', 'Subjects'],
            },
            {
              title: 'My Account',
              links: ['Sign In', 'View Cart', 'My Wishlist'],
            },
            {
              title: 'Help',
              links: ['Help center', 'Report a problem', 'Suggesting edits', 'Contact us'],
            },
          ].map((section, idx) => (
            <Grid item xs={6} md={2} key={idx}>
              <Typography variant="h6" className={styles.sectionTitle}>
                {section.title}
              </Typography>
              <ul className={styles.menuList}>
                {section.links.map((link, i) => (
                  <li key={i} className={styles.menuItem}>
                    <Link href="#" underline="hover">{link}</Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box className={styles.footerBottom}>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2">© 2025 BookFinds. All rights reserved.</Typography>
            </Grid>
            <Grid item xs={12} md={6} className={styles.alignRight}>
              <Box className={styles.socialLinks}>
                <Link href="#"><i className="icon icon-facebook" /></Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
