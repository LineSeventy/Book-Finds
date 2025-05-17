import React from "react";
import { NavLink } from "react-router";
import {
  AppBar, Toolbar, Container, Box,
  IconButton, InputBase, Typography,
  List, ListItem, ListItemText
} from "@mui/material";
import {
  AccountCircle, Search, ShoppingCart,
  ExpandMore, ExpandLess
} from "@mui/icons-material";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useAuth } from '../Context/Auth';
import SearchModal from './SearchModal';
import WishlistModal from './WishlistModal';
import styles from '../Styles/Header.module.css';
import logo from "../Assets/Logo.png";

const Header = () => {
  const [pagesOpen, setPagesOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [wishlistOpen, setWishlistOpen] = React.useState(false);

  const togglePagesMenu = () => setPagesOpen(!pagesOpen);
  const handleOpenSearch = () => setSearchOpen(true);
  const handleCloseSearch = () => setSearchOpen(false);
  const handleOpenWishlist = () => setWishlistOpen(true);
  const handleCloseWishlist = () => setWishlistOpen(false);

  const { user, wishlist } = useAuth();

  return (
    <AppBar position="static" className={styles.appBar} sx={{ backgroundColor: '#ffffff', color: '#333' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box component={NavLink} to="/" className={styles.logo}>
            <img src={logo} alt="BOOKFINDS" className={styles.logoImage} />
          </Box>

          <Box display="flex" alignItems="center" gap={4}>
            <Typography component={NavLink} to="/" className={styles.navLink}>Home</Typography>
            <Typography component={NavLink} to="/about" className={styles.navLink}>About Us</Typography>
            <Typography component={NavLink} to="/catalogue" className={styles.navLink}>Books</Typography>
            <Typography component={NavLink} to="/subscription" className={styles.navLink}>Subscription</Typography>

            <IconButton className={styles.hoverIconButton}>
              <AccountCircle />
              <Typography
                variant="body2"
                ml={1}
                component={NavLink}
                to={user ? "/account" : "/create"}
              >
                {user ? "My Account" : "Sign In"}
              </Typography>
            </IconButton>

            <IconButton className={styles.hoverIconButton} onClick={handleOpenWishlist}>
              <ShoppingCart />
              <Typography variant="body2" ml={1}>Wishlist ({wishlist.length})</Typography>
            </IconButton>

            <IconButton className={styles.hoverIconButton} onClick={handleOpenSearch}>
              <Search />
            </IconButton>

            <SearchModal open={searchOpen} onClose={handleCloseSearch} />
            <WishlistModal open={wishlistOpen} onClose={handleCloseWishlist} items={wishlist} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
