import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '150px',
  marginLeft: '50px',
  paddingBottom: '50px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: '600',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
  },
}));

const useSubmitButton = (handleSubmit, handleSubmitEdit, buttonText) => {
  const handleButtonClick = () => {
    buttonText === 'Zapisz' ? handleSubmit() : handleSubmitEdit();
  };

  const button = (
    <StyledButton variant='contained' onClick={handleButtonClick}>
      {buttonText}
    </StyledButton>
  );

  return button;
};

export default useSubmitButton;
