import React, { CSSProperties, MouseEvent } from 'react';
import Button from '@mui/material/Button';

interface CustomPrimaryButtonProps {
  label: string;
  additionalStyles?: CSSProperties;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CustomPrimaryButton: React.FC<CustomPrimaryButtonProps> = ({
  label,
  additionalStyles,
  disabled = false,
  onClick,
}): JSX.Element => {
  return (
    <Button
      variant='contained'
      sx={{
        bgcolor: '#5865F2',
        color: 'white',
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 500,
        width: '100%',
        height: '40px',
      }}
      style={additionalStyles || {}}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomPrimaryButton;
