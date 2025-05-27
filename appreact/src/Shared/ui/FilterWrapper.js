import React, { useState } from 'react';
import { TextField, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const FilterWrapper = ({ handleFilterChange }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (handleFilterChange) {
      handleFilterChange(value);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        variant='outlined'
        label={t('search', 'Szukaj')}
        value={searchTerm}
        onChange={handleChange}
        placeholder={t('searchPlaceholder', 'Wpisz frazę do wyszukania...')}
      />
    </Box>
  );
};

export default FilterWrapper;
