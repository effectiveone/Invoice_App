import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Stack,
  Card,
  CardContent,
  InputAdornment,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccountBalance as BankIcon,
} from '@mui/icons-material';
import { useKontrahentContext } from '../../Context/useKontrahentContext';
import { t } from 'i18next';

// Legal forms
const legalForms = [
  { value: 'sp_z_oo', label: 'Sp. z o.o.', type: 'company' },
  { value: 'sa', label: 'S.A.', type: 'company' },
  {
    value: 'jednoosobowa',
    label: 'Jednoosobowa działalność gospodarcza',
    type: 'individual',
  },
  { value: 'spolka_jawna', label: 'Spółka jawna', type: 'company' },
  { value: 'spolka_komandytowa', label: 'Spółka komandytowa', type: 'company' },
  { value: 'osoba_fizyczna', label: 'Osoba fizyczna', type: 'individual' },
  { value: 'fundacja', label: 'Fundacja', type: 'non_profit' },
  { value: 'stowarzyszenie', label: 'Stowarzyszenie', type: 'non_profit' },
  {
    value: 'instytucja_panstwowa',
    label: 'Instytucja państwowa',
    type: 'government',
  },
];

// Countries
const countries = [
  { value: 'PL', label: 'Polska' },
  { value: 'DE', label: 'Niemcy' },
  { value: 'CZ', label: 'Czechy' },
  { value: 'SK', label: 'Słowacja' },
  { value: 'UA', label: 'Ukraina' },
  { value: 'LT', label: 'Litwa' },
  { value: 'other', label: 'Inne' },
];

const EnhancedContrahentForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const { handleChange, handleSubmit, updatedCompanyData, errors } =
    useKontrahentContext();

  const [formData, setFormData] = useState({
    companyName: '',
    legalForm: 'sp_z_oo',
    nip: '',
    regon: '',
    krs: '',
    street: '',
    city: '',
    zipCode: '',
    country: 'PL',
    phone: '',
    email: '',
    website: '',
    contactPerson: '',
    notes: '',
    bankName: '',
    bankAccount: '',
    ...initialData,
  });

  useEffect(() => {
    if (updatedCompanyData) {
      setFormData((prev) => ({ ...prev, ...updatedCompanyData }));
    }
  }, [updatedCompanyData]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Call original handleChange if exists
    if (handleChange) {
      handleChange(event);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else if (handleSubmit) {
      handleSubmit(event);
    }
  };

  const getContrahentType = () => {
    const legalForm = legalForms.find(
      (form) => form.value === formData.legalForm,
    );
    return legalForm?.type || 'company';
  };

  const getAvatarIcon = () => {
    const type = getContrahentType();
    return type === 'individual' ? <PersonIcon /> : <BusinessIcon />;
  };

  const formatNIP = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Format as XXX-XXX-XX-XX
    if (digits.length >= 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
        6,
        8,
      )}-${digits.slice(8, 10)}`;
    }
    return digits;
  };

  const handleNIPChange = (event) => {
    const formatted = formatNIP(event.target.value);
    setFormData((prev) => ({ ...prev, nip: formatted }));

    // Create a modified event for the original handler
    if (handleChange) {
      const modifiedEvent = {
        ...event,
        target: { ...event.target, value: formatted },
      };
      handleChange(modifiedEvent);
    }
  };

  return (
    <Box component='form' onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
      {/* Header with Avatar */}
      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction='row' spacing={3} alignItems='center' sx={{ mb: 3 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>
              {getAvatarIcon()}
            </Avatar>
            <Box>
              <Typography variant='h6' component='h3'>
                {formData.companyName || 'Nowy kontrahent'}
              </Typography>
              <Chip
                label={
                  legalForms.find((f) => f.value === formData.legalForm)
                    ?.label || 'Wybierz formę prawną'
                }
                size='small'
                color='primary'
                variant='outlined'
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <BusinessIcon color='primary' />
            <Typography variant='h6' component='h3'>
              Podstawowe informacje
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel>Forma prawna</InputLabel>
                <Select
                  name='legalForm'
                  value={formData.legalForm}
                  onChange={handleFormChange}
                  label='Forma prawna'
                  error={!!errors?.legalForm}
                >
                  {legalForms.map((form) => (
                    <MenuItem key={form.value} value={form.value}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        {form.type === 'individual' ? (
                          <PersonIcon fontSize='small' />
                        ) : (
                          <BusinessIcon fontSize='small' />
                        )}
                        {form.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={
                  getContrahentType() === 'individual'
                    ? 'Imię i nazwisko'
                    : 'Nazwa firmy'
                }
                name='companyName'
                value={formData.companyName}
                onChange={handleFormChange}
                error={!!errors?.companyName}
                helperText={errors?.companyName}
                variant='outlined'
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='NIP'
                name='nip'
                value={formData.nip}
                onChange={handleNIPChange}
                error={!!errors?.nip}
                helperText={errors?.nip || 'Format: XXX-XXX-XX-XX'}
                variant='outlined'
                placeholder='123-456-78-90'
                inputProps={{ maxLength: 13 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='REGON'
                name='regon'
                value={formData.regon}
                onChange={handleFormChange}
                error={!!errors?.regon}
                helperText={errors?.regon}
                variant='outlined'
                inputProps={{ maxLength: 14 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='KRS'
                name='krs'
                value={formData.krs}
                onChange={handleFormChange}
                error={!!errors?.krs}
                helperText={errors?.krs}
                variant='outlined'
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Osoba kontaktowa'
                name='contactPerson'
                value={formData.contactPerson}
                onChange={handleFormChange}
                variant='outlined'
                placeholder='Jan Kowalski - Dyrektor sprzedaży'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <LocationIcon color='primary' />
            <Typography variant='h6' component='h3'>
              Adres
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Ulica i numer'
                name='street'
                value={formData.street}
                onChange={handleFormChange}
                error={!!errors?.street}
                helperText={errors?.street}
                variant='outlined'
                placeholder='ul. Przykładowa 123/45'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Miasto'
                name='city'
                value={formData.city}
                onChange={handleFormChange}
                error={!!errors?.city}
                helperText={errors?.city}
                variant='outlined'
                required
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label='Kod pocztowy'
                name='zipCode'
                value={formData.zipCode}
                onChange={handleFormChange}
                error={!!errors?.zipCode}
                helperText={errors?.zipCode}
                variant='outlined'
                placeholder='00-000'
                inputProps={{ maxLength: 6 }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label='Kraj'
                name='country'
                select
                value={formData.country}
                onChange={handleFormChange}
                variant='outlined'
              >
                {countries.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <PhoneIcon color='primary' />
            <Typography variant='h6' component='h3'>
              Kontakt
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Telefon'
                name='phone'
                value={formData.phone}
                onChange={handleFormChange}
                error={!!errors?.phone}
                helperText={errors?.phone}
                variant='outlined'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder='+48 123 456 789'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleFormChange}
                error={!!errors?.email}
                helperText={errors?.email}
                variant='outlined'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder='kontakt@firma.pl'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Strona internetowa'
                name='website'
                value={formData.website}
                onChange={handleFormChange}
                variant='outlined'
                placeholder='https://www.firma.pl'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Banking Information */}
      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <BankIcon color='primary' />
            <Typography variant='h6' component='h3'>
              Dane bankowe
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Nazwa banku'
                name='bankName'
                value={formData.bankName}
                onChange={handleFormChange}
                error={!!errors?.bankName}
                helperText={errors?.bankName}
                variant='outlined'
                placeholder='PKO Bank Polski'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Numer konta bankowego'
                name='bankAccount'
                value={formData.bankAccount}
                onChange={handleFormChange}
                error={!!errors?.bankAccount}
                helperText={errors?.bankAccount || 'IBAN lub numer konta'}
                variant='outlined'
                placeholder='PL 1234 5678 9012 3456 7890 1234'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h6' component='h3' sx={{ mb: 2 }}>
            Dodatkowe informacje
          </Typography>

          <TextField
            fullWidth
            label='Notatki'
            name='notes'
            value={formData.notes}
            onChange={handleFormChange}
            variant='outlined'
            multiline
            rows={4}
            placeholder='Dodatkowe informacje o kontrahencie, warunki współpracy, uwagi...'
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default EnhancedContrahentForm;
