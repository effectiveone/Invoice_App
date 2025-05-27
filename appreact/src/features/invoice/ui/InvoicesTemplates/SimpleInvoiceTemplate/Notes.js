import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useInvoiceContext } from '../../../../../entities/invoice/model/useInvoiceContext';
import { useTranslation } from 'react-i18next';

export default function Notes() {
  const { notes } = useInvoiceContext();
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: 10, marginBottom: 5 }} component='section'>
      <Typography variant='h3' component='h3'>
        {t('additionalNotes')}
      </Typography>
      <Typography
        variant='body1'
        component='p'
        sx={{ maxWidth: '50ch', textAlign: 'justify' }}
      >
        {notes}
      </Typography>
    </Box>
  );
}
