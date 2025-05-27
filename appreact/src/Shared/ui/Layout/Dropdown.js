import React from 'react';
import { MenuItem, Menu } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    marginTop: '8px',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: '8px',
  margin: '4px',
  padding: '12px 16px',
  fontWeight: '500',
  color: '#374151',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.1)',
    color: '#667eea',
  },
}));

function Dropdown({ handleLogout, open, id, anchorEl, handleClose }) {
  const { t } = useTranslation();

  return (
    <StyledMenu
      id={id}
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <StyledMenuItem onClick={handleLogout}>{t('logout')}</StyledMenuItem>
    </StyledMenu>
  );
}

export default Dropdown;
