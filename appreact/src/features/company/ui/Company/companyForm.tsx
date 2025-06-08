import React from 'react';
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Button,
  Paper,
} from '@material-ui/core';
import { CloudUpload, Image } from '@material-ui/icons';
import { legalForms } from '../../../../shared/utils/forms';
import { useTranslation } from 'react-i18next';
import type {
  Company,
  WhichInputs,
  TextFieldChangeHandler,
  SelectChangeHandler,
  LegalForm,
} from '../../../../types/common';
import { useLanguageListener } from '../../../../shared/lib/useLanguageListener';

interface CompanyFormProps {
  whichInputs: WhichInputs;
  updatedCompanyData?: Partial<Company>;
  handleChange: TextFieldChangeHandler | SelectChangeHandler;
  onLogoChange?: (logoData: string) => void;
  onLogoRemove?: () => void;
}

interface UseTranslationReturn {
  t: (key: string) => string;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  whichInputs,
  updatedCompanyData = {},
  handleChange,
  onLogoChange,
  onLogoRemove,
}): JSX.Element => {
  const { t }: UseTranslationReturn = useTranslation();

  const { currentLanguage } = useLanguageListener();

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(t('selectImageFile') || 'Proszę wybrać plik obrazu');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        t('fileTooLarge') || 'Plik jest za duży. Maksymalny rozmiar to 5MB',
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (onLogoChange) {
        onLogoChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' component='h2'>
            {t('companyData')}
          </Typography>
        </Grid>
        {whichInputs === 'company' && (
          <Grid item xs={12}>
            <Typography
              variant='h6'
              component='h3'
              style={{ marginBottom: 16 }}
            >
              {t('companyLogo') || 'Logo firmy'}
            </Typography>
            <Paper style={{ padding: 16, marginBottom: 16 }}>
              {updatedCompanyData.logo ? (
                <Box display='flex' alignItems='center'>
                  <Box style={{ marginRight: 16 }}>
                    <img
                      src={updatedCompanyData.logo}
                      alt='Logo firmy'
                      style={{
                        maxHeight: 100,
                        maxWidth: 200,
                        border: '1px solid #ddd',
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                  <Box>
                    <Button
                      variant='outlined'
                      component='label'
                      startIcon={<CloudUpload />}
                      style={{ marginRight: 8, marginBottom: 8 }}
                    >
                      {t('changeLogo') || 'Zmień logo'}
                      <input
                        type='file'
                        hidden
                        accept='image/*'
                        onChange={handleLogoUpload}
                      />
                    </Button>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={onLogoRemove}
                      style={{ marginBottom: 8 }}
                    >
                      {t('removeLogo') || 'Usuń logo'}
                    </Button>
                    <Typography
                      variant='caption'
                      display='block'
                      color='textSecondary'
                    >
                      {t('supportedFormats') ||
                        'Obsługiwane formaty: JPG, PNG, SVG (max 5MB)'}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box textAlign='center' padding={4}>
                  <Image
                    style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }}
                  />
                  <Typography variant='body1' gutterBottom>
                    {t('noLogo') || 'Brak logo firmy'}
                  </Typography>
                  <Button
                    variant='contained'
                    component='label'
                    startIcon={<CloudUpload />}
                  >
                    {t('uploadLogo') || 'Dodaj logo'}
                    <input
                      type='file'
                      hidden
                      accept='image/*'
                      onChange={handleLogoUpload}
                    />
                  </Button>
                  <Typography
                    variant='caption'
                    display='block'
                    color='textSecondary'
                    style={{ marginTop: 8 }}
                  >
                    {t('supportedFormats') ||
                      'Obsługiwane formaty: JPG, PNG, SVG (max 5MB)'}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel id='legalFormLabel'>{t('legalForm')}</InputLabel>
            <Select
              labelId='legalFormLabel'
              id='legalForm'
              name='legalForm'
              value={updatedCompanyData.legalForm || ''}
              onChange={handleChange as SelectChangeHandler}
              label={t('legalForm')}
            >
              {legalForms.map((form: LegalForm) => (
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
            onChange={handleChange as TextFieldChangeHandler}
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
            onChange={handleChange as TextFieldChangeHandler}
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
            onChange={handleChange as TextFieldChangeHandler}
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
            onChange={handleChange as TextFieldChangeHandler}
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
            onChange={handleChange as TextFieldChangeHandler}
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
            onChange={handleChange as TextFieldChangeHandler}
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
                onChange={handleChange as TextFieldChangeHandler}
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
                onChange={handleChange as TextFieldChangeHandler}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default CompanyForm;
