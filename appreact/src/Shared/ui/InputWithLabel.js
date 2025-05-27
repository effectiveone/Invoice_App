import React, { useState } from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  marginBottom: '24px',
});

const Label = styled('p')({
  color: '#374151',
  fontWeight: '500',
  fontSize: '14px',
  marginBottom: '8px',
  margin: 0,
  letterSpacing: '0.01em',
});

const InputContainer = styled('div')({
  position: 'relative',
  width: '100%',
});

const Input = styled('input')(({ hasError, isFocused }) => ({
  width: '100%',
  height: '48px',
  border: `2px solid ${
    hasError ? '#ef4444' : isFocused ? '#667eea' : '#e5e7eb'
  }`,
  borderRadius: '12px',
  color: '#1f2937',
  background: '#ffffff',
  fontSize: '16px',
  padding: '0 16px',
  outline: 'none',
  transition: 'all 0.2s ease-in-out',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  '&::placeholder': {
    color: '#9ca3af',
    fontSize: '14px',
  },
  '&:hover': {
    borderColor: hasError ? '#dc2626' : '#667eea',
  },
  '&:focus': {
    borderColor: hasError ? '#dc2626' : '#667eea',
    boxShadow: hasError
      ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
      : '0 0 0 3px rgba(102, 126, 234, 0.1)',
  },
  '&:disabled': {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
}));

const PasswordToggle = styled(IconButton)({
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#6b7280',
  '&:hover': {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    color: '#667eea',
  },
});

const ErrorText = styled('p')({
  color: '#ef4444',
  fontSize: '12px',
  margin: '4px 0 0 0',
  fontWeight: '400',
});

const InputWithLabel = (props) => {
  const { value, setValue, label, type, placeholder, error, disabled } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputContainer>
        <Input
          value={value}
          onChange={handleValueChange}
          type={inputType}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          hasError={!!error}
          isFocused={isFocused}
          disabled={disabled}
        />
        {type === 'password' && (
          <PasswordToggle
            onClick={togglePasswordVisibility}
            edge='end'
            size='small'
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </PasswordToggle>
        )}
      </InputContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};

export default InputWithLabel;
