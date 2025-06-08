import React, { useState } from 'react';
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
  Switch,
  FormControlLabel,
  Button,
  Divider,
} from '@mui/material';
import {
  Category as CategoryIcon,
  Euro as EuroIcon,
  Inventory as InventoryIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

// Product Categories for select
const productCategories = [
  { value: 'goods', label: 'Towary', icon: '📦' },
  { value: 'services', label: 'Usługi', icon: '🛠️' },
  { value: 'materials', label: 'Materiały', icon: '🧱' },
  { value: 'digital', label: 'Produkty cyfrowe', icon: '💻' },
  { value: 'other', label: 'Inne', icon: '📋' },
];

// VAT rates
const vatRates = [
  { value: 0, label: '0%' },
  { value: 5, label: '5%' },
  { value: 8, label: '8%' },
  { value: 23, label: '23%' },
];

// Units
const units = [
  { value: 'szt', label: 'sztuki' },
  { value: 'kg', label: 'kilogramy' },
  { value: 'l', label: 'litry' },
  { value: 'm', label: 'metry' },
  { value: 'm2', label: 'metry kwadratowe' },
  { value: 'm3', label: 'metry sześcienne' },
  { value: 'godz', label: 'godziny' },
  { value: 'dni', label: 'dni' },
  { value: 'usł', label: 'usługi' },
];

const EnhancedProductForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: (initialData && initialData.name) || '',
    code: (initialData && initialData.code) || '',
    netPrice: (initialData && initialData.netPrice) || '',
    vat: (initialData && initialData.vat) || 23,
    grossPrice: (initialData && initialData.grossPrice) || '',
    currency: (initialData && initialData.currency) || 'PLN',
    description: (initialData && initialData.description) || '',
    tags: (initialData && initialData.tags) || '',
    quantity: (initialData && initialData.quantity) || '',
    service: (initialData && initialData.service) || false,
    purchaseNetPrice: (initialData && initialData.purchaseNetPrice) || '',
    purchaseVat: (initialData && initialData.purchaseVat) || 23,
    purchaseGrossPrice: (initialData && initialData.purchaseGrossPrice) || '',
    unit: (initialData && initialData.unit) || 'szt',
    defaultQuantity: (initialData && initialData.defaultQuantity) || '',
    pkwiu: (initialData && initialData.pkwiu) || '',
    supplierCode: (initialData && initialData.supplierCode) || '',
    accountingCode: (initialData && initialData.accountingCode) || '',
    category: (initialData && initialData.category) || 'goods',
    minStock: (initialData && initialData.minStock) || '',
    maxStock: (initialData && initialData.maxStock) || '',
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };

      // Auto-calculate gross price when net price or VAT changes
      if (name === 'netPrice' || name === 'vat') {
        const netPrice =
          parseFloat(name === 'netPrice' ? value : updated.netPrice) || 0;
        const vatRate = parseFloat(name === 'vat' ? value : updated.vat) || 0;
        updated.grossPrice = (netPrice * (1 + vatRate / 100)).toFixed(2);
      }

      // Auto-calculate purchase gross price when purchase net price or purchase VAT changes
      if (name === 'purchaseNetPrice' || name === 'purchaseVat') {
        const purchaseNetPrice =
          parseFloat(
            name === 'purchaseNetPrice' ? value : updated.purchaseNetPrice,
          ) || 0;
        const purchaseVatRate =
          parseFloat(name === 'purchaseVat' ? value : updated.purchaseVat) || 0;
        updated.purchaseGrossPrice = (
          purchaseNetPrice *
          (1 + purchaseVatRate / 100)
        ).toFixed(2);
      }

      return updated;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare data for backend
    const backendData = {
      ...formData,
      // Convert tags string to array for backend
      tags:
        typeof formData.tags === 'string'
          ? formData.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : formData.tags,
      // Ensure required numeric fields are numbers
      netPrice: parseFloat(formData.netPrice) || 0,
      vat: parseFloat(formData.vat) || 0,
      grossPrice: parseFloat(formData.grossPrice) || 0,
      quantity: parseFloat(formData.quantity) || 0,
      purchaseNetPrice: parseFloat(formData.purchaseNetPrice) || 0,
      purchaseVat: parseFloat(formData.purchaseVat) || 0,
      purchaseGrossPrice: parseFloat(formData.purchaseGrossPrice) || 0,
      defaultQuantity: parseFloat(formData.defaultQuantity) || 0,
      userEmail: localStorage.getItem('userEmail') || '',
    };

    if (onSubmit) {
      onSubmit(backendData);
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
              <CategoryIcon color='primary' />
              Podstawowe informacje
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Nazwa produktu'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Kod produktu'
                  name='code'
                  value={formData.code}
                  onChange={handleChange}
                  variant='outlined'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CodeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Kategoria</InputLabel>
                  <Select
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    label='Kategoria'
                  >
                    {productCategories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Jednostka</InputLabel>
                  <Select
                    name='unit'
                    value={formData.unit}
                    onChange={handleChange}
                    label='Jednostka'
                  >
                    {units.map((unit) => (
                      <MenuItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Opis'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  variant='outlined'
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Tagi (oddzielone przecinkami)'
                  name='tags'
                  value={formData.tags}
                  onChange={handleChange}
                  variant='outlined'
                  placeholder='elektronika, komputer, laptop'
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Ceny sprzedaży */}
        <Card elevation={2}>
          <CardContent>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <EuroIcon color='primary' />
              Ceny sprzedaży
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Cena netto'
                  name='netPrice'
                  type='number'
                  value={formData.netPrice}
                  onChange={handleChange}
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>PLN</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>VAT</InputLabel>
                  <Select
                    name='vat'
                    value={formData.vat}
                    onChange={handleChange}
                    label='VAT'
                  >
                    {vatRates.map((rate) => (
                      <MenuItem key={rate.value} value={rate.value}>
                        {rate.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Cena brutto'
                  name='grossPrice'
                  type='number'
                  value={formData.grossPrice}
                  onChange={handleChange}
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>PLN</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Ceny zakupu */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Ceny zakupu
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Cena zakupu netto'
                  name='purchaseNetPrice'
                  type='number'
                  value={formData.purchaseNetPrice}
                  onChange={handleChange}
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>PLN</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>VAT zakupu</InputLabel>
                  <Select
                    name='purchaseVat'
                    value={formData.purchaseVat}
                    onChange={handleChange}
                    label='VAT zakupu'
                  >
                    {vatRates.map((rate) => (
                      <MenuItem key={rate.value} value={rate.value}>
                        {rate.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Cena zakupu brutto'
                  name='purchaseGrossPrice'
                  type='number'
                  value={formData.purchaseGrossPrice}
                  onChange={handleChange}
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>PLN</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Magazyn */}
        <Card elevation={2}>
          <CardContent>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <InventoryIcon color='primary' />
              Magazyn
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.service}
                      onChange={handleChange}
                      name='service'
                    />
                  }
                  label='To jest usługa (bez magazynu)'
                />
              </Grid>

              {!formData.service && (
                <>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label='Ilość dostępna'
                      name='quantity'
                      type='number'
                      value={formData.quantity}
                      onChange={handleChange}
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label='Domyślna ilość'
                      name='defaultQuantity'
                      type='number'
                      value={formData.defaultQuantity}
                      onChange={handleChange}
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label='Minimalny stan'
                      name='minStock'
                      type='number'
                      value={formData.minStock}
                      onChange={handleChange}
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label='Maksymalny stan'
                      name='maxStock'
                      type='number'
                      value={formData.maxStock}
                      onChange={handleChange}
                      variant='outlined'
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Card>

        {/* Dodatkowe informacje */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Dodatkowe informacje
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='PKWiU'
                  name='pkwiu'
                  value={formData.pkwiu}
                  onChange={handleChange}
                  variant='outlined'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Kod dostawcy'
                  name='supplierCode'
                  value={formData.supplierCode}
                  onChange={handleChange}
                  variant='outlined'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label='Kod księgowy'
                  name='accountingCode'
                  value={formData.accountingCode}
                  onChange={handleChange}
                  variant='outlined'
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

export default EnhancedProductForm;
