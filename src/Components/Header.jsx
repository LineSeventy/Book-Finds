import React from "react";
import { NavLink, useNavigate } from "react-router";
import {
  AppBar, Toolbar, Container, Box,
  IconButton, Typography, Drawer, useMediaQuery
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
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { user, wishlist } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Books", path: "/catalogue" },
    { label: "Subscription", path: "/subscription" }
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleOpenWishlist = () => setWishlistOpen(true);
  const handleCloseWishlist = () => setWishlistOpen(false);

  React.useEffect(() => {
    if (query.length > 1) {
      fetch(`${import.meta.env.VITE_API_URL}/api/search-books?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setSuggestions(data))
        .catch(err => console.error('Search fetch error:', err));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#333', zIndex: '1' }}>
      <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component={NavLink} to="/" className={styles.logo}>
              <img src={logo} alt="BOOKFINDS" className={styles.logoImage} />
            </Box>
          </Box>

          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, position: "relative" }}>
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

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton className={styles.hoverIconButton} onClick={() => setSearchOpen(true)}>
                  <Search />
                </IconButton>

               {searchOpen && (
  <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
    <Box
      sx={{
        width: 300,
        height: 250,
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 2,
        position: 'absolute',
        right: 0,
        top: '100%',
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Search Input */}
      <Box sx={{ p: 1, borderBottom: '1px solid #eee' }}>
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '1rem'
          }}
        />
      </Box>

      {/* Suggestions List */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        {suggestions.length > 0 ? (
          suggestions.map(book => (
            <Box
              key={book.id}
              sx={{
                px: 2,
                py: 1,
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#f0f0f0' }
              }}
              onClick={() => {
                setSearchOpen(false);
                navigate(`/catalogue/${book.id}`);
              }}
            >
              {book.fullybooked_title}
            </Box>
          ))
        ) : (
          <Box sx={{ px: 2, py: 1, color: '#999' }}>
            No suggestions found
          </Box>
        )}
      </Box>
    </Box>
  </ClickAwayListener>
)}
              </Box>
            </Box>
          ) : (
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
                    gap: 2
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
                    onClick={() => setSearchOpen(true)}
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

      <WishlistModal open={wishlistOpen} onClose={handleCloseWishlist} items={wishlist} />
    </AppBar>
  );
};

export default Header;
