import React, { useState, useRef } from 'react';
import { AppBar, Box, Toolbar, Typography, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { getActions } from '../../../app/store/Actions/authActions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { sanitizedUrl } from '../../utils/api';
import { useUser } from '../../lib/useUser';
import { t } from 'i18next';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background:
    theme.customTheme?.gradient ||
    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: `0 4px 20px ${theme.palette.primary.main}50`,
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  marginLeft: '280px',
  width: 'calc(100% - 280px)',
  zIndex: 1300,
  transition: 'background 0.3s ease, box-shadow 0.3s ease',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
  minHeight: '64px',
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '24px',
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.9)',
  },
}));

const UserSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

const WelcomeChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '& .MuiChip-label': {
    fontWeight: '500',
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(1.1)',
  },
}));

export default function Navbar({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { logout } = getActions(dispatch);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const opendropdown = Boolean(anchorEl);
  const id = opendropdown ? 'user-menu-popover' : undefined;
  const inputElement = useRef();

  return (
    <StyledAppBar position='fixed' elevation={0}>
      <StyledToolbar>
        <LogoSection>
          <Avatar
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
            }}
          >
            📄
          </Avatar>
          <LogoText component={Link} to={sanitizedUrl.Dashboard} variant='h6'>
            InvoiceApp
          </LogoText>
        </LogoSection>

        <UserSection>
          <WelcomeChip
            label={`${t('welcome')}, ${currentUser?.username}`}
            variant='outlined'
          />
          <UserAvatar
            ref={inputElement}
            onClick={handleClick}
            aria-label='account of current user'
            aria-controls={id}
            aria-haspopup='true'
          >
            {currentUser?.username?.charAt(0).toUpperCase()}
          </UserAvatar>
          <Dropdown
            handleLogout={handleLogout}
            open={opendropdown}
            id={id}
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </UserSection>
      </StyledToolbar>
    </StyledAppBar>
  );
}
