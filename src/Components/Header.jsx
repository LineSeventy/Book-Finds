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
import styles from '../Styles/Header.module.css';
import logo from "../Assets/Logo.png"
import WishlistModal from './WishlistModal';
const Header = () => {
  const [pagesOpen, setPagesOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const togglePagesMenu = () => setPagesOpen(!pagesOpen);
  const handleOpenSearch = () => setSearchOpen(true);
  const handleCloseSearch = () => setSearchOpen(false);
  const { user } = useAuth();
  const [wishlistOpen, setWishlistOpen] = React.useState(false);
const [wishlistItems, setWishlistItems] = React.useState([]); // Could be moved to context later

const handleOpenWishlist = () => setWishlistOpen(true);
const handleCloseWishlist = () => setWishlistOpen(false);
const { wishlist } = useAuth(); 
  return (
    <AppBar position="static" className={styles.appBar} sx={{ backgroundColor: '#ffffff', color: '#333' }}>
      <Container maxWidth="xl">
        <Toolbar className={styles.toolbarSpaceBetween}>
          <Box />
          <Box display="flex" alignItems="center" gap={2}>
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
            <div className={styles.searchBar}>
              <Search onClick={handleOpenSearch} />
              <SearchModal open={searchOpen} onClose={handleCloseSearch} />
            </div>
          </Box>
        </Toolbar>

        <Toolbar sx={{ justifyContent: "space-between", mt: 1 }}>
        <Box component={NavLink} to="/" className={styles.logo}>
  <img src={logo} alt="BOOKFINDS" className={styles.logoImage} />
</Box>

          <Box display="flex" alignItems="center" gap={4}>
            <Typography component={NavLink} to="/" className={styles.navLink}>
              Home
            </Typography>

            <Box>
              <ClickAwayListener onClickAway={() => setPagesOpen(false)}>
                <Box
                  onMouseEnter={() => setPagesOpen(true)}
                  onMouseLeave={() => setPagesOpen(false)}
                  className={styles.dropdownWrapper}
                >
                  <Typography className={styles.dropdownTrigger}>
                    Pages {pagesOpen ? <ExpandLess /> : <ExpandMore />}
                  </Typography>

                  {pagesOpen && (
                    <Box className={styles.dropdownBox}>
                      <List dense>
                        <ListItem button component={NavLink} to="/about">
                          <ListItemText primary="About Us" />
                        </ListItem>

                        <ListItem button component={NavLink} to="/contact">
                          <ListItemText primary="Contact" />
                        </ListItem>
                      </List>
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            </Box>

            <Typography component={NavLink} to="/catalogue" className={styles.navLink}>
              Books
            </Typography>
            <Typography component={NavLink} to="/subscription" className={styles.navLink}>
              Subscription
            </Typography>
          </Box>
        </Toolbar>
      </Container>
      <WishlistModal open={wishlistOpen} onClose={handleCloseWishlist} items={wishlist} />

    </AppBar>
    
  );
};

export default Header;
