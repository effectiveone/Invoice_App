import React, { useEffect } from 'react';
import {
  Box,
  IconButton,
  Paper,
  ClickAwayListener,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import { useSettings } from '../../Hook/useSettings';
import { v4 as uuid } from 'uuid';

const LanguageSelector = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  overflow: 'visible',
}));

const SelectedOption = styled(IconButton)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontSize: '24px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  },
}));

const OptionsContainer = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '70px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10000,
  padding: '8px',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: '80px',
  pointerEvents: 'auto',
}));

const OptionButton = styled(IconButton)(({ theme, isSelected }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  fontSize: '20px',
  transition: 'all 0.2s ease',
  backgroundColor: isSelected ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
  border: isSelected ? '2px solid #667eea' : '2px solid transparent',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.1)',
    transform: 'scale(1.1)',
  },
}));

const CustomSelect = () => {
  const {
    isOpen,
    selectedOption,
    toggleOptions,
    handleLang,
    options,
    language,
  } = useSettings();

  // Debug logging
  useEffect(() => {
    console.log('🌐 CustomSelect - State update:', {
      selectedOption,
      currentLanguage: language,
      isOpen,
    });
  }, [selectedOption, language, isOpen]);

  const selectOption = (option) => {
    console.log('🌐 CustomSelect - Option selected:', {
      option,
      currentLanguage: language,
    });

    // Nie zmieniamy języka jeśli to ten sam
    if (option.value === language) {
      console.log(
        '🌐 CustomSelect - Same language selected, just closing dropdown',
      );
      toggleOptions();
      return;
    }

    handleLang(option.value);
    toggleOptions();
  };

  const handleClickAway = () => {
    if (isOpen) {
      toggleOptions();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <LanguageSelector>
        <Tooltip
          title={`Obecny język: ${selectedOption?.label || 'Nieznany'}`}
          placement='top'
        >
          <SelectedOption onClick={toggleOptions}>
            {selectedOption?.icon}
          </SelectedOption>
        </Tooltip>

        {isOpen && (
          <OptionsContainer elevation={0}>
            {options.map((option) => (
              <Tooltip
                key={option.value}
                title={option.label}
                placement='right'
              >
                <OptionButton
                  onClick={() => selectOption(option)}
                  size='small'
                  isSelected={option.value === language}
                >
                  {option.icon}
                </OptionButton>
              </Tooltip>
            ))}
          </OptionsContainer>
        )}
      </LanguageSelector>
    </ClickAwayListener>
  );
};

export default CustomSelect;
