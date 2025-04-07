import React from 'react';
import { Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import styles from '../Styles/Sorting.module.css'; // Import CSS Module

function SortByOptions({ onSortChange }) {
  return (
    <Box sx={{ paddingBottom: 2 }}>
      <FormControl fullWidth className={styles.sortByControl}>
        <InputLabel id="sort-select-label" className={styles.label}>Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          defaultValue=""
          onChange={e => onSortChange(e.target.value)}
          label="Sort By"
          className={styles.select}
        >
          <MenuItem value="A-Z">A-Z</MenuItem>
          <MenuItem value="least-expensive">Least Expensive</MenuItem>
          <MenuItem value="most-expensive">Most Expensive</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SortByOptions;
