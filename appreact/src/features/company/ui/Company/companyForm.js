import React from 'react';
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { legalForms } from '../../../../shared/utils/forms';
import { useTranslation } from 'react-i18next';

function CompanyForm({ whichInputs, updatedCompanyData = {}, handleChange }) {
  const { t } = useTranslation();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' component='h2'>
            {t('companyData')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel id='legalFormLabel'>{t('legalForm')}</InputLabel>
            <Select
              labelId='legalFormLabel'
              id='legalForm'
              name='legalForm'
              value={updatedCompanyData.legalForm || ''}
              onChange={handleChange}
              label={t('legalForm')}
            >
              {legalForms.map((form) => (
                <MenuItem key={form.value} value={form.value}>
                  {form.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id='companyName'
            name='companyName'
            label={t('companyName')}
            variant='outlined'
            value={updatedCompanyData.companyName || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id='nip'
            name='nip'
            label='NIP'
            variant='outlined'
            value={updatedCompanyData.nip || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id='regon'
            name='regon'
            label='REGON'
            variant='outlined'
            value={updatedCompanyData.regon || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='street'
            name='street'
            label={t('street')}
            variant='outlined'
            value={updatedCompanyData.street || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id='city'
            name='city'
            label={t('city')}
            variant='outlined'
            value={updatedCompanyData.city || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id='zipCode'
            name='zipCode'
            label={t('zipCode')}
            variant='outlined'
            value={updatedCompanyData.zipCode || ''}
            onChange={handleChange}
          />
        </Grid>
        {whichInputs === 'company' && (
          <>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id='bankName'
                name='bankName'
                label={t('bankName')}
                variant='outlined'
                value={updatedCompanyData.bankName || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id='bankAccount'
                name='bankAccount'
                label={t('bankAccount')}
                variant='outlined'
                value={updatedCompanyData.bankAccount || ''}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export default CompanyForm;
