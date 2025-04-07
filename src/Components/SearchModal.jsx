// SearchModal.jsx
import React from 'react';
import { Modal, Fade, Backdrop, Box, TextField } from '@mui/material';

const SearchModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            outline: 'none',
          }}
        >
          <TextField
            fullWidth
            autoFocus
            placeholder="Search…"
            variant="outlined"
            InputProps={{
              sx: { fontSize: '1.2rem' },
            }}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default SearchModal;
