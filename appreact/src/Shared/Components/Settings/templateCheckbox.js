import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { updateSettings } from '../../../Store/Actions/settingsActions';
import { useUser } from '../../Hook/useUser';

const TemplateOption = styled(Paper)(({ theme, selected }) => ({
  padding: '16px',
  margin: '8px 0',
  borderRadius: '12px',
  border: `2px solid ${selected ? '#667eea' : 'transparent'}`,
  background: selected
    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
    : 'rgba(255, 255, 255, 0.8)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    border: `2px solid ${selected ? '#667eea' : '#e5e7eb'}`,
  },
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: '#667eea',
  '&.Mui-checked': {
    color: '#667eea',
  },
}));

const TemplateCheckbox = () => {
  const { currentUser } = useUser();
  const dispatch = useDispatch();

  const selectedOption = useSelector(
    (state) => state?.settings?.settings?.templateInvoice,
  );

  const templates = [
    {
      value: 'basicInput',
      label: 'Szablon podstawowy',
      description: 'Prosty i minimalistyczny szablon faktury',
    },
    {
      value: 'mediumInput',
      label: 'Szablon rozszerzony',
      description: 'Szablon z dodatkowymi polami i informacjami',
    },
    {
      value: 'printerInput',
      label: 'Szablon drukarki',
      description: 'Zoptymalizowany szablon do drukowania',
    },
  ];

  const handleChange = (value) => {
    if (!currentUser) return;
    dispatch(
      updateSettings(
        {
          templateInvoice: value,
          email: currentUser?.mail,
        },
        currentUser,
      ),
    );
  };

  return (
    <Box sx={{ mt: 1 }}>
      <FormControl component='fieldset' fullWidth>
        <RadioGroup
          value={selectedOption || 'basicInput'}
          onChange={(e) => handleChange(e.target.value)}
        >
          {templates.map((template) => (
            <TemplateOption
              key={template.value}
              selected={selectedOption === template.value}
              onClick={() => handleChange(template.value)}
            >
              <FormControlLabel
                value={template.value}
                control={<StyledRadio />}
                label={
                  <Box>
                    <Typography
                      variant='subtitle2'
                      sx={{ fontWeight: '600', color: '#374151' }}
                    >
                      {template.label}
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{ color: '#6b7280', fontSize: '12px' }}
                    >
                      {template.description}
                    </Typography>
                  </Box>
                }
                sx={{ margin: 0, width: '100%' }}
              />
            </TemplateOption>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default TemplateCheckbox;
