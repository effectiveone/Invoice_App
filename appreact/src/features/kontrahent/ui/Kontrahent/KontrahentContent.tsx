import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { EnhancedContrahentsTable } from '../../../../shared/ui/DataTable';
import { useTranslation } from 'react-i18next';
import { useLanguageListener } from '../../../../shared/lib/useLanguageListener';

export const KontrahentContent = () => {
  const { t } = useTranslation();

  // 🔥 Hook który wymusza re-render przy zmianie języka
  const { currentLanguage } = useLanguageListener();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h4' component='h1' gutterBottom>
          {t('contrahent')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <EnhancedContrahentsTable />
      </Grid>
    </Grid>
  );
};

export default KontrahentContent;
