import React, { useState } from 'react';
import {
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

// Proste formy prawne
const legalForms = [
  { value: 'sp_z_oo', label: 'Sp. z o.o.' },
  { value: 'sa', label: 'S.A.' },
  { value: 'jednoosobowa', label: 'Jednoosobowa działalność' },
  { value: 'osoba_fizyczna', label: 'Osoba fizyczna' },
  { value: 'fundacja', label: 'Fundacja' },
];

const EnhancedContrahentForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    legalForm: (initialData && initialData.legalForm) || '',
    companyName: (initialData && initialData.companyName) || '',
    nip: (initialData && initialData.nip) || '',
    regon: (initialData && initialData.regon) || '',
    krs: (initialData && initialData.krs) || '',
    street: (initialData && initialData.street) || '',
    city: (initialData && initialData.city) || '',
    zipCode: (initialData && initialData.zipCode) || '',
    email: (initialData && initialData.email) || '',
    phone: (initialData && initialData.phone) || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {/* Podstawowe informacje */}
        <Card elevation={2}>
          <CardContent>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <BusinessIcon color='primary' />
              Podstawowe informacje
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Forma prawna</InputLabel>
                  <Select
                    name='legalForm'
                    value={formData.legalForm}
                    onChange={handleChange}
                    label='Forma prawna'
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
                  label='Nazwa firmy'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleChange}
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Dane rejestrowe */}
        <Card elevation={2}>
          <CardContent>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <PersonIcon color='primary' />
              Dane rejestrowe
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='NIP'
                  name='nip'
                  value={formData.nip}
                  onChange={handleChange}
                  variant='outlined'
                  placeholder='123-456-78-90'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='REGON'
                  name='regon'
                  value={formData.regon}
                  onChange={handleChange}
                  variant='outlined'
                  placeholder='123456789'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='KRS'
                  name='krs'
                  value={formData.krs}
                  onChange={handleChange}
                  variant='outlined'
                  placeholder='0000123456'
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Adres */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Adres
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Ulica i numer'
                  name='street'
                  value={formData.street}
                  onChange={handleChange}
                  variant='outlined'
                  placeholder='ul. Przykładowa 123'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Miasto'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  variant='outlined'
                  placeholder='Warszawa'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Kod pocztowy'
                  name='zipCode'
                  value={formData.zipCode}
                  onChange={handleChange}
                  variant='outlined'
                  placeholder='00-000'
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Kontakt */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Dane kontaktowe
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  variant='outlined'
                  placeholder='kontakt@firma.pl'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Telefon'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  variant='outlined'
                  placeholder='+48 123 456 789'
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Przyciski */}
        <Box
          sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pt: 2 }}
        >
          <Button
            variant='outlined'
            onClick={onCancel}
            size='large'
            sx={{ minWidth: 120 }}
          >
            Anuluj
          </Button>
          <Button
            type='submit'
            variant='contained'
            size='large'
            sx={{ minWidth: 120 }}
          >
            Zapisz
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default EnhancedContrahentForm;
