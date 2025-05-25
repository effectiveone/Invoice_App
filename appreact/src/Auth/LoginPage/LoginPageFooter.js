import React from 'react';
import { Button, Typography, Box, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Login as LoginIcon } from '@mui/icons-material';

const FooterContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginTop: '8px',
});

const StyledButton = styled(Button)(({ disabled }) => ({
  height: '48px',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  textTransform: 'none',
  background: disabled
    ? '#e5e7eb'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: disabled ? '#9ca3af' : 'white',
  border: 'none',
  boxShadow: disabled ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  cursor: disabled ? 'not-allowed' : 'pointer',
  '&:hover': {
    background: disabled
      ? '#e5e7eb'
      : 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: disabled ? 'none' : 'translateY(-2px)',
    boxShadow: disabled ? 'none' : '0 6px 20px rgba(102, 126, 234, 0.4)',
  },
  '&:active': {
    transform: disabled ? 'none' : 'translateY(0)',
  },
}));

const RegisterText = styled(Typography)({
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '14px',
});

const RegisterLink = styled('span')({
  color: '#667eea',
  cursor: 'pointer',
  fontWeight: '600',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: '#5a67d8',
  },
});

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <FooterContainer>
      <Tooltip
        title={!isFormValid ? 'Wypełnij wszystkie pola poprawnie' : ''}
        placement='top'
      >
        <span>
          <StyledButton
            onClick={handleLogin}
            disabled={!isFormValid}
            fullWidth
            startIcon={<LoginIcon />}
          >
            Zaloguj się
          </StyledButton>
        </span>
      </Tooltip>

      <RegisterText>
        Nie masz jeszcze konta?{' '}
        <RegisterLink onClick={handlePushToRegisterPage}>
          Zarejestruj się
        </RegisterLink>
      </RegisterText>
    </FooterContainer>
  );
};

export default LoginPageFooter;
