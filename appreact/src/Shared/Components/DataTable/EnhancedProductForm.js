import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Chip,
  Stack,
  Card,
  CardContent,
  InputAdornment,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Category as CategoryIcon,
  Euro as EuroIcon,
  Inventory as InventoryIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { useProductContext } from '../../Context/useProductContext';

// Product Categories for select - memoized to prevent re-render
const productCategories = [
  { value: 'goods', label: 'Towary', icon: '📦' },
  { value: 'services', label: 'Usługi', icon: '🛠️' },
  { value: 'materials', label: 'Materiały', icon: '🧱' },
  { value: 'digital', label: 'Produkty cyfrowe', icon: '💻' },
  { value: 'other', label: 'Inne', icon: '📋' },
];

// VAT rates - memoized to prevent re-render
const vatRates = [
  { value: 0, label: '0%' },
  { value: 5, label: '5%' },
  { value: 8, label: '8%' },
  { value: 23, label: '23%' },
];

// Units - memoized to prevent re-render
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

const EnhancedProductForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const { handleChange, handleSubmit, product, errors } = useProductContext();

  // Map frontend form to backend model fields
  const [formData, setFormData] = useState({
    name: '',
    code: '', // Backend uses 'code' not 'sku'
    netPrice: '',
    vat: 23,
    grossPrice: '',
    currency: 'PLN', // Required in backend
    description: '',
    tags: [],
    quantity: '',
    service: false, // Backend uses 'service' boolean, not 'unlimited'
    purchaseNetPrice: '', // Required in backend
    purchaseVat: 23, // Required in backend
    purchaseGrossPrice: '', // Required in backend
    unit: 'szt',
    defaultQuantity: '', // Required in backend
    pkwiu: '',
    supplierCode: '',
    accountingCode: '',
    userEmail: '', // Required in backend
    // Additional frontend fields
    category: 'goods',
    minStock: '',
    maxStock: '',
    ...initialData,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        // Map backend 'code' to frontend and vice versa
        code: initialData.code || initialData.sku || '',
        // Convert tags array to string for form
        tags: Array.isArray(initialData.tags)
          ? initialData.tags.join(', ')
          : initialData.tags || '',
        // Map service boolean
        service: initialData.service || initialData.unlimited || false,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        ...product,
        code: product.code || product.sku || '',
        tags: Array.isArray(product.tags)
          ? product.tags.join(', ')
          : product.tags || '',
        service: product.service || product.unlimited || false,
      }));
    }
  }, [product]);

  // Memoized callback to prevent re-renders
  const handleFormChange = useCallback(
    (event) => {
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
            parseFloat(name === 'purchaseVat' ? value : updated.purchaseVat) ||
            0;
          updated.purchaseGrossPrice = (
            purchaseNetPrice *
            (1 + purchaseVatRate / 100)
          ).toFixed(2);
        }

        return updated;
      });

      // Call original handleChange if exists
      if (handleChange) {
        const mappedEvent = {
          ...event,
          target: {
            ...event.target,
            name: name === 'service' ? 'service' : name, // Keep backend field names
            value: newValue,
          },
        };
        handleChange(mappedEvent);
      }
    },
    [handleChange],
  );

  const handleFormSubmit = useCallback(
    (event) => {
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
        // Get user email from context or localStorage
        userEmail:
          formData.userEmail || localStorage.getItem('userEmail') || '',
      };

      if (onSubmit) {
        onSubmit(backendData);
      } else if (handleSubmit) {
        handleSubmit(event);
      }
    },
    [formData, onSubmit, handleSubmit],
  );

  // Memoized category icon getter
  const getCategoryIcon = useCallback((category) => {
    const cat = productCategories.find((c) => c.value === category);
    return cat?.icon || '📋';
  }, []);

  // Memoized VAT options to prevent re-render
  const vatOptions = useMemo(
    () =>
      vatRates.map((rate) => (
        <MenuItem key={rate.value} value={rate.value}>
          {rate.label}
        </MenuItem>
      )),
    [],
  );

  // Memoized unit options to prevent re-render
  const unitOptions = useMemo(
    () =>
      units.map((unit) => (
        <MenuItem key={unit.value} value={unit.value}>
          {unit.label}
        </MenuItem>
      )),
    [],
  );

  // Memoized category options to prevent re-render
  const categoryOptions = useMemo(
    () =>
      productCategories.map((category) => (
        <MenuItem key={category.value} value={category.value}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>{category.icon}</span>
            {category.label}
          </Box>
        </MenuItem>
      )),
    [],
  );

  return (
    <Box component='form' onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <CategoryIcon color='primary' />
            <Typography variant='h6' component='h3'>
              Podstawowe informacje
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label='Nazwa produktu'
                name='name'
                value={formData.name}
                onChange={handleFormChange}
                error={!!errors?.name}
                helperText={errors?.name}
                variant='outlined'
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Kod produktu'
                name='code'
                value={formData.code}
                onChange={handleFormChange}
                error={!!errors?.code}
                helperText={errors?.code}
                variant='outlined'
                required
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
              <FormControl fullWidth variant='outlined'>
                <InputLabel>Kategoria</InputLabel>
                <Select
                  name='category'
                  value={formData.category}
                  onChange={handleFormChange}
                  label='Kategoria'
                  renderValue={(value) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{getCategoryIcon(value)}</span>
                      {productCategories.find((c) => c.value === value)?.label}
                    </Box>
                  )}
                >
                  {categoryOptions}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel>Jednostka miary</InputLabel>
                <Select
                  name='unit'
                  value={formData.unit}
                  onChange={handleFormChange}
                  label='Jednostka miary'
                  required
                >
                  {unitOptions}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Opis produktu'
                name='description'
                value={formData.description}
                onChange={handleFormChange}
                variant='outlined'
                multiline
                rows={3}
                placeholder='Dodatkowe informacje o produkcie...'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <EuroIcon color='primary' />
            <Typography variant='h6' component='h3'>
              Ceny sprzedażowe
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Cena netto'
                name='netPrice'
                type='number'
                value={formData.netPrice}
                onChange={handleFormChange}
                error={!!errors?.netPrice}
                helperText={errors?.netPrice}
                variant='outlined'
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>zł</InputAdornment>
                  ),
                }}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant='outlined' required>
                <InputLabel>VAT</InputLabel>
                <Select
                  name='vat'
                  value={formData.vat}
                  onChange={handleFormChange}
                  label='VAT'
                >
                  {vatOptions}
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
                variant='outlined'
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>zł</InputAdornment>
                  ),
                  readOnly: true,
                }}
                helperText='Obliczana automatycznie'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <EuroIcon color='primary' />
            <Typography variant='h6' component='h3'>
              Ceny zakupowe (wymagane)
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Cena zakupu netto'
                name='purchaseNetPrice'
                type='number'
                value={formData.purchaseNetPrice}
                onChange={handleFormChange}
                error={!!errors?.purchaseNetPrice}
                helperText={errors?.purchaseNetPrice}
                variant='outlined'
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>zł</InputAdornment>
                  ),
                }}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant='outlined' required>
                <InputLabel>VAT zakupu</InputLabel>
                <Select
                  name='purchaseVat'
                  value={formData.purchaseVat}
                  onChange={handleFormChange}
                  label='VAT zakupu'
                >
                  {vatOptions}
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
                variant='outlined'
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>zł</InputAdornment>
                  ),
                  readOnly: true,
                }}
                helperText='Obliczana automatycznie'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <InventoryIcon color='primary' />
            <Typography variant='h6' component='h3'>
              Magazyn i logistyka
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.service}
                    onChange={handleFormChange}
                    name='service'
                    color='primary'
                  />
                }
                label='To jest usługa (nie wymaga magazynowania)'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Aktualna ilość'
                name='quantity'
                type='number'
                value={formData.quantity}
                onChange={handleFormChange}
                error={!!errors?.quantity}
                helperText={errors?.quantity}
                variant='outlined'
                required
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Domyślna ilość'
                name='defaultQuantity'
                type='number'
                value={formData.defaultQuantity}
                onChange={handleFormChange}
                error={!!errors?.defaultQuantity}
                helperText={errors?.defaultQuantity || 'Wymagane przez system'}
                variant='outlined'
                required
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Waluta'
                name='currency'
                value={formData.currency}
                onChange={handleFormChange}
                error={!!errors?.currency}
                helperText={errors?.currency}
                variant='outlined'
                required
                disabled
              />
            </Grid>

            {!formData.service && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label='Minimalny stan magazynowy'
                    name='minStock'
                    type='number'
                    value={formData.minStock}
                    onChange={handleFormChange}
                    variant='outlined'
                    inputProps={{ min: 0 }}
                    helperText='Poniżej tej wartości pojawi się ostrzeżenie'
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label='Maksymalny stan magazynowy'
                    name='maxStock'
                    type='number'
                    value={formData.maxStock}
                    onChange={handleFormChange}
                    variant='outlined'
                    inputProps={{ min: 0 }}
                    helperText='Opcjonalny limit magazynowy'
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Additional backend fields */}
      <Card elevation={0} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h6' component='h3' sx={{ mb: 2 }}>
            Dodatkowe informacje
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='PKWiU'
                name='pkwiu'
                value={formData.pkwiu}
                onChange={handleFormChange}
                variant='outlined'
                placeholder='np. 26.20.11.0'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Kod dostawcy'
                name='supplierCode'
                value={formData.supplierCode}
                onChange={handleFormChange}
                variant='outlined'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label='Kod księgowy'
                name='accountingCode'
                value={formData.accountingCode}
                onChange={handleFormChange}
                variant='outlined'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Tagi (oddzielone przecinkami)'
                name='tags'
                value={formData.tags}
                onChange={handleFormChange}
                variant='outlined'
                placeholder='elektronika, laptop, biznes'
                helperText='Ułatwią wyszukiwanie produktu'
              />
            </Grid>

            {formData.tags &&
              typeof formData.tags === 'string' &&
              formData.tags.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant='subtitle2' gutterBottom>
                    Podgląd tagów:
                  </Typography>
                  <Stack direction='row' spacing={1} flexWrap='wrap'>
                    {formData.tags.split(',').map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag.trim()}
                        size='small'
                        variant='outlined'
                      />
                    ))}
                  </Stack>
                </Grid>
              )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EnhancedProductForm;
