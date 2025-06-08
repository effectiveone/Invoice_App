import React from 'react';
import { styled, Theme } from '@mui/system';
import { Paper } from '@mui/material';

interface AuthBoxProps {}

interface StyledPaperProps {
  theme?: Theme;
}

const BoxWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '20px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
});

const StyledPaper = styled(Paper)<StyledPaperProps>(({ theme }) => ({
  width: '100%',
  maxWidth: '450px',
  padding: '40px',
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow:
      '0 25px 70px rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15)',
  },
  '@media (max-width: 600px)': {
    margin: '0 20px',
    padding: '30px 25px',
    maxWidth: '100%',
  },
}));

const AuthBox: React.FC<React.PropsWithChildren<AuthBoxProps>> = ({
  children,
}): JSX.Element => {
  return (
    <BoxWrapper>
      <StyledPaper elevation={0}>{children}</StyledPaper>
    </BoxWrapper>
  );
};

export default AuthBox;
