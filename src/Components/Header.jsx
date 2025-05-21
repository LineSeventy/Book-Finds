import React from "react";
import { NavLink } from "react-router";
import {
  AppBar, Toolbar, Container, Box,
  IconButton, Typography, Drawer, List,
  ListItem, ListItemText, useMediaQuery
} from "@mui/material";
import {
  AccountCircle, Search, ShoppingCart, Menu
} from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useAuth } from '../Context/Auth';
import SearchModal from './SearchModal';
import WishlistModal from './WishlistModal';
import styles from '../Styles/Header.module.css';
import logo from "../Assets/Logo.png";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [wishlistOpen, setWishlistOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleOpenSearch = () => setSearchOpen(true);
  const handleCloseSearch = () => setSearchOpen(false);
  const handleOpenWishlist = () => setWishlistOpen(true);
  const handleCloseWishlist = () => setWishlistOpen(false);

  const { user, wishlist } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Books", path: "/catalogue" },
    { label: "Subscription", path: "/subscription" }
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#333', zIndex:'1' }}>
      <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component={NavLink} to="/" className={styles.logo}>
              <img src={logo} alt="BOOKFINDS" className={styles.logoImage} />
            </Box>
          </Box>


          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              {navItems.map((item) => (
                <Typography
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  className={styles.navLink}
                >
                  {item.label}
                </Typography>
              ))}

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
            </Box>
          )}


          {isMobile && (
            <>
<IconButton onClick={toggleDrawer(true)} className={styles.hoverIconButton}>
  <Menu />
</IconButton>

<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
  <Box
    sx={{
      width: 260,
      padding: 2,
      backgroundColor: '#fff',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: 2,
      animation: 'fadeIn 0.3s ease'
    }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
 

    {navItems.map((item) => (
      <Typography
        key={item.label}
        component={NavLink}
        to={item.path}
        className={styles.navLink}
        sx={{ padding: "12px 8px", fontSize: "1rem" }}
      >
        {item.label}
      </Typography>
    ))}

    <Typography
      component={NavLink}
      to={user ? "/account" : "/create"}
      className={styles.navLink}
      sx={{ padding: "12px 8px", fontSize: "1rem" }}
    >
      {user ? "My Account" : "Sign In"}
    </Typography>

    <Typography
      onClick={handleOpenWishlist}
      className={styles.navLink}
      sx={{ padding: "12px 8px", fontSize: "1rem", cursor: "pointer" }}
    >
      Wishlist ({wishlist.length})
    </Typography>

    <Typography
      onClick={handleOpenSearch}
      className={styles.navLink}
      sx={{ padding: "12px 8px", fontSize: "1rem", cursor: "pointer" }}
    >
      Search
    </Typography>
  </Box>
</Drawer>

            </>
          )}
        </Toolbar>
      </Container>

 
      <SearchModal open={searchOpen} onClose={handleCloseSearch} />
      <WishlistModal open={wishlistOpen} onClose={handleCloseWishlist} items={wishlist} />
    </AppBar>
  );
};

export default Header;
