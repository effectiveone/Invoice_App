import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { AccountCircle } from '@mui/icons-material';

const HeaderContainer = styled(Box)({
  textAlign: 'center',
  marginBottom: '32px',
});

const IconWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
});

const StyledIcon = styled(AccountCircle)({
  fontSize: '48px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '50%',
  padding: '8px',
  color: 'white',
});

const Title = styled(Typography)({
  color: '#1f2937',
  fontWeight: '700',
  marginBottom: '8px',
  fontSize: '28px',
  letterSpacing: '-0.02em',
});

const Subtitle = styled(Typography)({
  color: '#6b7280',
  fontSize: '16px',
  fontWeight: '400',
});

const LoginPageHeader = () => {
  return (
    <HeaderContainer>
      <IconWrapper>
        <StyledIcon />
      </IconWrapper>
      <Title variant='h4'>Witaj ponownie!</Title>
      <Subtitle>Zaloguj się do swojego konta fakturowego</Subtitle>
    </HeaderContainer>
  );
};

export default LoginPageHeader;
