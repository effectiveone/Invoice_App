import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import {
  Delete,
  Add,
  Receipt,
  Note,
  Business,
  DateRange,
  AttachMoney,
  ShoppingCart,
  Search,
  Close,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useInvoiceContext } from '../../../../entities/invoice/model/useInvoiceContext';
import { useProduct } from '../../../../shared/lib/useProduct';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '24px',
  padding: '16px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '12px',
  color: 'white',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '16px',
  fontWeight: '600',
  color: '#374151',
  fontSize: '18px',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '&:hover fieldset': {
      borderColor: '#667eea',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '&:hover fieldset': {
      borderColor: '#667eea',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
    },
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '12px',
  padding: '12px 24px',
  fontWeight: '600',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  },
}));

const RemoveButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  borderRadius: '8px',
  minWidth: 'auto',
  padding: '8px',
  '&:hover': {
    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
  },
}));

const TotalCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  borderRadius: '16px',
  border: '1px solid #0ea5e9',
}));

const ProductPickerModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProductPickerContent = styled(Paper)(({ theme }) => ({
  width: '90%',
  maxWidth: '800px',
  maxHeight: '80vh',
  overflow: 'hidden',
  borderRadius: '16px',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
}));

const ProductPickerHeader = styled(Box)(({ theme }) => ({
  padding: '24px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ProductList = styled(List)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  padding: 0,
}));

const SearchBox = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderBottom: '1px solid #e5e7eb',
}));

// Komponent do wyboru produktów z magazynu
const ProductPicker = ({ open, onClose, onSelectProduct, products = [] }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectProduct = (product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <ProductPickerModal open={open} onClose={onClose}>
      <ProductPickerContent>
        <ProductPickerHeader>
          <Typography
            variant='h6'
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <ShoppingCart />
            {t('selectProduct', 'Wybierz produkt z magazynu')}
          </Typography>
          <Button
            onClick={onClose}
            sx={{ color: 'white', minWidth: 'auto', p: 1 }}
          >
            <Close />
          </Button>
        </ProductPickerHeader>

        <SearchBox>
          <StyledTextField
            fullWidth
            placeholder={t('searchProducts', 'Szukaj produktów...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search sx={{ mr: 1, color: 'text.secondary' }} />
              ),
            }}
          />
        </SearchBox>

        <ProductList>
          {filteredProducts.length === 0 ? (
            <ListItem>
              <ListItemText
                primary={t('noProductsFound', 'Nie znaleziono produktów')}
                sx={{ textAlign: 'center', color: 'text.secondary' }}
              />
            </ListItem>
          ) : (
            filteredProducts.map((product, index) => (
              <React.Fragment key={product._id || product.id || index}>
                <ListItemButton
                  onClick={() => handleSelectProduct(product)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.05)',
                    },
                  }}
                >
                  <ListItemText
                    primary={product.name || t('noData')}
                    secondary={
                      <Box>
                        <Typography variant='caption' color='text.secondary'>
                          {product.code && `Kod: ${product.code} | `}
                          Cena netto: {Number(product.netPrice || 0).toFixed(
                            2,
                          )}{' '}
                          PLN | VAT: {product.vat || 0}% | Jednostka:{' '}
                          {product.unit || 'szt'}
                        </Typography>
                        {product.description && (
                          <Typography
                            variant='caption'
                            display='block'
                            color='text.secondary'
                          >
                            {product.description}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
                {index < filteredProducts.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </ProductList>
      </ProductPickerContent>
    </ProductPickerModal>
  );
};

const InvoiceForm = () => {
  const { t } = useTranslation();
  const {
    invoiceType,
    setInvoiceType,
    currentInvoiceNumber,
    TAX_RATES,
    selectedKontrahent,
    items,
    setItems,
    totalNetValue,
    setTotalNetValue,
    totalGrossValue,
    setTotalGrossValue,
    kontrahent,
    invoiceSaleDate,
    setInvoiceSaleDate,
    invoicePaymentDate,
    setInvoicePaymentDate,
    handleSelectChange,
    invoiceDates,
    setInvoiceDates,
    setNotes,
    notes,
  } = useInvoiceContext();

  const { productList, loadProducts } = useProduct();
  const [isNotesVisibility, setIsNotesVisibility] = useState(false);
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);

  // Produkty będą ładowane automatycznie przez useProduct hook

  const changeVisibility = () => {
    setIsNotesVisibility(!isNotesVisibility);
  };

  const handleSelectProductFromInventory = (product) => {
    // Sprawdzamy czy VAT jest w procentach (np. 23) czy w ułamkach (np. 0.23)
    const vatValue =
      product.vat > 1 ? product.vat / 100 : product.vat || TAX_RATES[0].value;
    const quantity = product.defaultQuantity || 1;
    const netPrice = Number(product.netPrice) || 0;
    const netValue = quantity * netPrice;
    const grossValue = netValue * (1 + vatValue);

    const newItem = {
      name: product.name || '',
      quantity,
      unit: product.unit || 'szt',
      vat: vatValue,
      netPrice,
      netValue,
      grossValue,
      // Dodatkowe dane produktu
      productId: product._id || product.id,
      code: product.code,
      description: product.description,
    };

    // Sprawdzamy czy pierwszy element jest pusty (nowo dodana faktura ma domyślnie pusty element)
    const isFirstItemEmpty =
      items.length === 1 &&
      (!items[0].name || items[0].name.trim() === '') &&
      (items[0].netPrice === 0 || items[0].netPrice === '') &&
      items[0].quantity === 1 &&
      items[0].netValue === 0 &&
      items[0].grossValue === 0;

    if (isFirstItemEmpty) {
      // Zastępujemy pusty element wybranym produktem
      setItems([newItem]);
    } else {
      // Dodajemy nowy element do istniejącej listy
      setItems([...items, newItem]);
    }
  };

  useEffect(() => {
    const newTotalNetValue = items?.reduce(
      (total, item) => total + item.netValue,
      0,
    );
    const newTotalGrossValue = items?.reduce(
      (total, item) => total + item.grossValue,
      0,
    );
    setTotalNetValue(newTotalNetValue);
    setTotalGrossValue(newTotalGrossValue);
  }, [items, setTotalGrossValue, setTotalNetValue]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: '',
        quantity: 1,
        unit: 'szt',
        vat: TAX_RATES[0].value,
        netPrice: 0,
        netValue: 0,
        grossValue: 0,
      },
    ]);
  };

  const handleAddFromInventory = () => {
    console.log('ProductList:', productList);
    console.log('ProductList length:', productList?.length);

    if (!productList || productList.length === 0) {
      // Spróbuj załadować produkty ponownie
      if (loadProducts) {
        loadProducts();
      }
      // Pokaż informację użytkownikowi
      alert(
        t(
          'noProductsAvailable',
          'Brak dostępnych produktów w magazynie. Spróbuj ponownie za chwilę.',
        ),
      );
      return;
    }

    setIsProductPickerOpen(true);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    // Jeśli usuniemy wszystkie elementy, dodajemy jeden pusty element
    if (newItems.length === 0) {
      newItems.push({
        name: '',
        quantity: 1,
        unit: 'szt',
        vat: TAX_RATES[0].value,
        netPrice: 0,
        netValue: 0,
        grossValue: 0,
      });
    }

    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === 'quantity' || field === 'netPrice' || field === 'vat') {
      const item = newItems[index];
      const netValue = item.quantity * item.netPrice;
      const grossValue = netValue * (1 + item.vat);
      newItems[index].netValue = netValue;
      newItems[index].grossValue = grossValue;
    }
    setItems(newItems);
  };

  return (
    <Container maxWidth='xl'>
      <HeaderSection>
        <Receipt sx={{ fontSize: 32, marginRight: 2 }} />
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {t('newInvoiceTitle')}
          </Typography>
          <Typography variant='h6' sx={{ opacity: 0.9 }}>
            {t('invoice')} {currentInvoiceNumber}
          </Typography>
        </Box>
      </HeaderSection>

      {/* Sekcja klienta i typu faktury */}
      <StyledPaper>
        <SectionTitle>
          <Business />
          {t('contractorData')}
        </SectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledFormControl fullWidth>
              <InputLabel>{t('selectCustomer')}</InputLabel>
              <Select
                value={selectedKontrahent?.kontrahent_nip || ''}
                onChange={handleSelectChange}
                label={t('selectCustomer')}
              >
                {kontrahent?.map((k, index) => (
                  <MenuItem key={index} value={k.nip}>
                    {k.companyName}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledFormControl fullWidth>
              <InputLabel>{t('invoiceType', 'Typ faktury')}</InputLabel>
              <Select
                value={invoiceType}
                onChange={(e) => setInvoiceType(e.target.value)}
                label={t('invoiceType', 'Typ faktury')}
              >
                <MenuItem value='zakupowa'>{t('zakupowa')}</MenuItem>
                <MenuItem value='sprzedazowa'>{t('sprzedazowa')}</MenuItem>
                <MenuItem value='koregujaca'>{t('koregujaca')}</MenuItem>
                <MenuItem value='zaliczkowa'>{t('zaliczkowa')}</MenuItem>
                <MenuItem value='proformaSprzedazowa'>
                  {t('proformaSprzedazowa')}
                </MenuItem>
                <MenuItem value='proformaZakupowa'>
                  {t('proformaZakupowa')}
                </MenuItem>
              </Select>
            </StyledFormControl>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Sekcja dat */}
      <StyledPaper>
        <SectionTitle>
          <DateRange />
          {t('invoiceDates', 'Daty faktury')}
        </SectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledTextField
              fullWidth
              type='date'
              label={t('invoiceDates')}
              value={invoiceDates}
              onChange={(e) => setInvoiceDates(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledTextField
              fullWidth
              type='date'
              label={t('invoiceSaleDate')}
              value={invoiceSaleDate}
              onChange={(e) => setInvoiceSaleDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledTextField
              fullWidth
              type='date'
              label={t('invoicePaymentDate')}
              value={invoicePaymentDate}
              onChange={(e) => setInvoicePaymentDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Sekcja produktów/usług */}
      <StyledPaper>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={3}
        >
          <SectionTitle sx={{ marginBottom: 0 }}>
            <AttachMoney />
            {t('productOrSerivce')}
          </SectionTitle>
          <Box display='flex' gap={2}>
            <Button
              variant='outlined'
              onClick={handleAddFromInventory}
              startIcon={<ShoppingCart />}
              sx={{
                borderColor: '#10b981',
                color: '#10b981',
                '&:hover': {
                  borderColor: '#059669',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                },
              }}
            >
              {t('addFromInventory', 'Dodaj z magazynu')}
            </Button>
            <AddButton
              variant='contained'
              onClick={handleAddItem}
              startIcon={<Add />}
            >
              {t('addProductOrService')}
            </AddButton>
          </Box>
        </Box>

        {items?.map((item, index) => (
          <InvoiceItem
            key={index}
            index={index}
            item={item}
            items={items}
            taxRates={TAX_RATES}
            onRemove={handleRemoveItem}
            onChange={handleItemChange}
          />
        ))}
      </StyledPaper>

      {/* Sekcja notatek */}
      <StyledPaper>
        <SectionTitle>
          <Note />
          {t('additionalNotes')}
        </SectionTitle>
        <Button onClick={changeVisibility} variant='outlined' sx={{ mb: 2 }}>
          {isNotesVisibility ? t('hideNotes') : t('showNotes')}
        </Button>
        {isNotesVisibility && (
          <StyledTextField
            fullWidth
            multiline
            rows={4}
            label={t('additionalNotes')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('additionalNotes') + '...'}
          />
        )}
      </StyledPaper>

      {/* Sekcja podsumowania */}
      <TotalCard>
        <CardContent>
          <Typography
            variant='h6'
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#0369a1' }}
          >
            {t('totalPayment', 'Podsumowanie')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box textAlign='center' p={2}>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: 'bold', color: '#059669' }}
                >
                  {totalNetValue?.toFixed(2)} PLN
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {t('netValue')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign='center' p={2}>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: 'bold', color: '#dc2626' }}
                >
                  {(totalGrossValue - totalNetValue)?.toFixed(2)} PLN
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  VAT
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign='center' p={2}>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: 'bold', color: '#0369a1' }}
                >
                  {totalGrossValue?.toFixed(2)} PLN
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {t('grossValue')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </TotalCard>

      {/* Product Picker Modal */}
      <ProductPicker
        open={isProductPickerOpen}
        onClose={() => setIsProductPickerOpen(false)}
        onSelectProduct={handleSelectProductFromInventory}
        products={productList || []}
      />
    </Container>
  );
};

const InvoiceItem = ({ index, item, items, taxRates, onRemove, onChange }) => {
  const { t } = useTranslation();

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    onChange(index, name, value);
  };

  const handleTaxChange = (event) => {
    const { value } = event.target;
    onChange(index, 'vat', parseFloat(value));
  };

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        background: 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
      }}
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Typography variant='h6' sx={{ fontWeight: '600', color: '#374151' }}>
          {t('productOrSerivce')} {index + 1}
        </Typography>
        {(index > 0 ||
          (index === 0 && items.length > 1) ||
          (index === 0 && (item.name?.trim() || item.netPrice > 0))) && (
          <RemoveButton
            variant='contained'
            onClick={() => onRemove(index)}
            startIcon={<Delete />}
            size='small'
          >
            {t('delete')}
          </RemoveButton>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            label={t('description')}
            name='name'
            value={item.name}
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={6} md={1}>
          <StyledTextField
            fullWidth
            label={t('quantity')}
            type='number'
            name='quantity'
            value={item.quantity}
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={6} md={1}>
          <StyledTextField
            fullWidth
            label={t('unit')}
            name='unit'
            value={item.unit}
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={6} md={1}>
          <StyledFormControl fullWidth>
            <InputLabel>VAT</InputLabel>
            <Select value={item.vat} onChange={handleTaxChange} label='VAT'>
              {taxRates?.map((rate) => (
                <MenuItem key={rate.value} value={rate.value}>
                  {rate.label}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid>
        <Grid item xs={6} md={1}>
          <StyledTextField
            fullWidth
            label={t('netPrice')}
            type='number'
            name='netPrice'
            value={item.netPrice}
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={6} md={1}>
          <StyledTextField
            fullWidth
            label={t('netValue')}
            type='number'
            name='netValue'
            value={item.netValue?.toFixed(2)}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={6} md={1}>
          <StyledTextField
            fullWidth
            label={t('grossValue')}
            type='number'
            name='grossValue'
            value={item.grossValue?.toFixed(2)}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InvoiceForm;
