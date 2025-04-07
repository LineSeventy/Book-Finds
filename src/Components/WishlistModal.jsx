import React from 'react';
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
  Box
} from '@mui/material';

const formatPrice = (label, price) => {
  return price ? `${label}: ₱${price}` : `${label}: N/A`;
};

const WishlistModal = ({ open, onClose, items }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Your Wishlist</DialogTitle>
      <DialogContent dividers>
        {items.length > 0 ? (
          <List>
            {items.map((item, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={item.title}
                  secondary={
                    <Box component="span" display="block">
                      <Typography variant="body2">{formatPrice("Fullybooked", item.fullybooked_price)}</Typography>
                      <Typography variant="body2">{formatPrice("National Bookstore", item.nationalbookstore_price)}</Typography>
                      <Typography variant="body2">{formatPrice("Allbooked", item.allbooked_price)}</Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No items in your wishlist.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WishlistModal;
