import React from 'react';
import { Typography } from '@mui/material';
import { t } from 'i18next';

const LoginPageHeader = () => {
  return (
    <>
      <Typography variant='h5' sx={{ color: 'white' }}>
        {t('welcomeBack')}
      </Typography>
      <Typography sx={{ color: '#b9bbbe' }}>{t('happy')}</Typography>
    </>
  );
};

export default LoginPageHeader;
