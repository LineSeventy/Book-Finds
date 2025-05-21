import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router';
import { useTheme } from '@mui/material/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';

import styles from '../Styles/wishlistModal.module.css';
import { useAuth } from '../Context/Auth';

const WishlistModal = ({ open, onClose }) => {
  const {
    wishlist: items,
    handleDeleteFromWishlist,
    handleClearWishlist
  } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const formatPrice = (label, price) => {
    return price ? `${label}: ₱${price}` : `${label}: N/A`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogTitle className={styles.dialogTitle}>Your Wishlist</DialogTitle>
      <DialogContent dividers className={styles.dialogContent}>
        {items.length > 0 ? (
          <List disablePadding>
            {items.map((item, index) => (
              <ListItem
                key={index}
                className={styles.listItem}
                data-aos="fade-in"
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={8}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" className={styles.title}>
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <Box component="span" display="block">
                          <Typography variant="body2">{formatPrice("Fullybooked", item.fullybooked_price)}</Typography>
                          <Typography variant="body2">{formatPrice("National Bookstore", item.nationalbookstore_price)}</Typography>
                          <Typography variant="body2">{formatPrice("Allbooked", item.allbooked_price)}</Typography>
                        </Box>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className={styles.buttonGroup}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/catalogue/${encodeURIComponent(item.id)}`}
                      className={styles.viewButton}
                    >
                      View
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      color="error"
                      onClick={() => handleDeleteFromWishlist(item.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography className={styles.emptyText}>No items in your wishlist.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        {items.length > 0 && (
          <Button color="secondary" onClick={handleClearWishlist}>
            Clear All
          </Button>
        )}
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WishlistModal;
