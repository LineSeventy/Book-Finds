import React, { useState, useEffect } from 'react';
import {
  Modal, Fade, Backdrop, Box, TextField, List, ListItemButton, ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router';

const SearchModal = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 1) {
      fetch(`${import.meta.env.VITE_API_URL}/api/search-books?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setSuggestions(data))
        .catch(err => console.error('Search fetch error:', err));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (bookId) => {
    onClose();
    navigate(`/catalogue/${encodeURIComponent(bookId)}`);
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition
      slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 300 } }}>
      <Fade in={open}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: '90%', maxWidth: 500,
          bgcolor: 'background.paper', boxShadow: 24, borderRadius: 2, p: 4, outline: 'none',
        }}>
          <TextField
            fullWidth autoFocus value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            variant="outlined"
            InputProps={{ sx: { fontSize: '1.2rem' } }}
          />
          {suggestions.length > 0 && (
            <List>
              {suggestions.map(book => (
                <ListItemButton key={book.id} onClick={() => handleSelect(book.id)}>
                  <ListItemText primary={book.fullybooked_title} />
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SearchModal;
