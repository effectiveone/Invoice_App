import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/system';

const InvoiceContainer = styled(Box)(
  ({ theme, colors, layout, customSettings }) => ({
    width: '210mm',
    minHeight: '297mm',
    margin: '0 auto',
    padding: `${customSettings?.marginTop || 25}mm ${
      customSettings?.marginRight || 25
    }mm ${customSettings?.marginBottom || 25}mm ${
      customSettings?.marginLeft || 25
    }mm`,
    backgroundColor: 'white',
    fontFamily: customSettings?.fontFamily || 'Helvetica, Arial, sans-serif',
    fontSize: `${customSettings?.fontSize || 11}px`,
    lineHeight: 1.8,
    color: '#2c2c2c',
    position: 'relative',
  }),
);

const Header = styled(Box)(({ colors, layout, customSettings }) => ({
  marginBottom: '50px',
  paddingBottom: `${
    customSettings?.headerHeight ? customSettings.headerHeight / 6 : 20
  }px`,
  borderBottom:
    layout === 'clean'
      ? `1px solid ${colors?.primary || '#667eea'}`
      : layout === 'simple'
      ? 'none'
      : `2px solid ${colors?.primary || '#667eea'}`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
}));

const Logo = styled('img')({
  maxHeight: '60px',
  maxWidth: '180px',
  objectFit: 'contain',
});

const InvoiceTitle = styled(Typography)(({ colors }) => ({
  fontSize: '24px',
  fontWeight: '300',
  color: colors?.primary || '#667eea',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  margin: 0,
}));

const SectionTitle = styled(Typography)(({ colors }) => ({
  fontSize: '14px',
  fontWeight: '600',
  color: colors?.primary || '#667eea',
  marginBottom: '20px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
}));

const InfoSection = styled(Box)(({ layout }) => ({
  marginBottom: '40px',
  padding: layout === 'simple' ? '0' : '20px 0',
}));

const StyledTable = styled(Table)(({ colors, layout }) => ({
  '& .MuiTableHead-root': {
    '& .MuiTableCell-head': {
      backgroundColor: 'transparent',
      color: colors?.primary || '#667eea',
      fontWeight: '600',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: `2px solid ${colors?.primary || '#667eea'}`,
      padding: layout === 'clean' ? '12px 8px' : '16px 8px',
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root': {
      '&:nth-of-type(even)': {
        backgroundColor: layout === 'simple' ? 'transparent' : '#fafafa',
      },
    },
  },
  '& .MuiTableCell-root': {
    borderBottom: layout === 'clean' ? '1px solid #e0e0e0' : 'none',
    padding: layout === 'clean' ? '8px' : '12px 8px',
    fontSize: '11px',
  },
}));

const TotalSection = styled(Box)(({ colors, layout }) => ({
  marginTop: '40px',
  paddingTop: '20px',
  borderTop:
    layout === 'simple'
      ? `1px solid ${colors?.primary || '#667eea'}`
      : `2px solid ${colors?.primary || '#667eea'}`,
  textAlign: 'right',
}));

const Footer = styled(Box)(({ colors, customSettings }) => ({
  marginTop: '60px',
  paddingTop: `${
    customSettings?.footerHeight ? customSettings.footerHeight / 3 : 20
  }px`,
  borderTop: `1px solid #e0e0e0`,
  textAlign: 'center',
  color: '#888',
  fontSize: '10px',
}));

const MinimalTemplate = ({
  invoiceData,
  templateConfig = {},
  layout = 'classic',
  colors = { primary: '#667eea', secondary: '#764ba2' },
  logo,
  customSettings = {},
}) => {
  const {
    invoiceNumber = 'MIN-001',
    issueDate = new Date().toLocaleDateString('pl-PL'),
    dueDate = new Date().toLocaleDateString('pl-PL'),
    seller = {},
    buyer = {},
    items = [],
    subtotal = 0,
    taxAmount = 0,
    total = 0,
    notes = '',
    paymentTerms = '',
  } = invoiceData || {};

  const renderCompanyInfo = (company, title) => (
    <Box sx={{ mb: 3 }}>
      <SectionTitle colors={colors}>{title}</SectionTitle>
      <Typography
        variant='h6'
        sx={{ fontWeight: '400', mb: 1, color: '#2c2c2c', fontSize: '16px' }}
      >
        {company.name || 'Nazwa firmy'}
      </Typography>
      <Typography
        variant='body2'
        sx={{ mb: 0.5, color: '#666', fontSize: '11px' }}
      >
        {company.address || 'Adres'}
      </Typography>
      <Typography
        variant='body2'
        sx={{ mb: 0.5, color: '#666', fontSize: '11px' }}
      >
        {company.city || 'Miasto'}
      </Typography>
      <Typography
        variant='body2'
        sx={{ mb: 0.5, color: '#666', fontSize: '11px' }}
      >
        NIP: {company.nip || 'NIP'}
      </Typography>
      {company.phone && (
        <Typography variant='body2' sx={{ color: '#666', fontSize: '11px' }}>
          Tel: {company.phone}
        </Typography>
      )}
      {company.email && (
        <Typography variant='body2' sx={{ color: '#666', fontSize: '11px' }}>
          {company.email}
        </Typography>
      )}
    </Box>
  );

  const renderInvoiceDetails = () => (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography
            variant='body2'
            sx={{ color: '#888', fontSize: '10px', mb: 0.5 }}
          >
            NUMER FAKTURY
          </Typography>
          <Typography
            variant='h5'
            sx={{ fontWeight: '300', color: colors?.primary, mb: 2 }}
          >
            {invoiceNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant='body2'
            sx={{ color: '#888', fontSize: '10px', mb: 0.5 }}
          >
            DATA WYSTAWIENIA
          </Typography>
          <Typography variant='body1' sx={{ fontWeight: '400', mb: 1 }}>
            {issueDate}
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: '#888', fontSize: '10px', mb: 0.5 }}
          >
            TERMIN PŁATNOŚCI
          </Typography>
          <Typography
            variant='body1'
            sx={{ fontWeight: '400', color: '#d32f2f' }}
          >
            {dueDate}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const renderItemsTable = () => (
    <Box sx={{ mb: 5 }}>
      <SectionTitle colors={colors}>Pozycje</SectionTitle>
      <StyledTable colors={colors} layout={layout}>
        <TableHead>
          <TableRow>
            <TableCell>Opis</TableCell>
            <TableCell align='center'>Ilość</TableCell>
            <TableCell align='right'>Cena</TableCell>
            <TableCell align='center'>VAT</TableCell>
            <TableCell align='right'>Netto</TableCell>
            <TableCell align='right'>Brutto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ fontWeight: '400' }}>{item.name}</TableCell>
              <TableCell align='center'>
                {item.quantity} {item.unit}
              </TableCell>
              <TableCell align='right'>{item.price?.toFixed(2)} zł</TableCell>
              <TableCell align='center'>{item.vat}%</TableCell>
              <TableCell align='right' sx={{ fontWeight: '500' }}>
                {(item.quantity * item.price)?.toFixed(2)} zł
              </TableCell>
              <TableCell
                align='right'
                sx={{ fontWeight: '600', color: colors?.primary }}
              >
                {(item.quantity * item.price * (1 + item.vat / 100))?.toFixed(
                  2,
                )}{' '}
                zł
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );

  const renderTotals = () => (
    <TotalSection colors={colors} layout={layout}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {paymentTerms && (
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: '600',
                  mb: 1,
                  color: colors?.primary,
                  fontSize: '12px',
                }}
              >
                WARUNKI PŁATNOŚCI
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: '#666', fontSize: '11px' }}
              >
                {paymentTerms}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  variant='body2'
                  sx={{ fontSize: '11px', color: '#888' }}
                >
                  Wartość netto:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant='body2'
                  sx={{ textAlign: 'right', fontSize: '11px' }}
                >
                  {subtotal?.toFixed(2)} zł
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant='body2'
                  sx={{ fontSize: '11px', color: '#888' }}
                >
                  VAT:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant='body2'
                  sx={{ textAlign: 'right', fontSize: '11px' }}
                >
                  {taxAmount?.toFixed(2)} zł
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2, borderColor: colors?.primary }} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: '600',
                    color: colors?.primary,
                    fontSize: '16px',
                  }}
                >
                  DO ZAPŁATY:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant='h6'
                  sx={{
                    textAlign: 'right',
                    fontWeight: '600',
                    color: colors?.primary,
                    fontSize: '16px',
                  }}
                >
                  {total?.toFixed(2)} zł
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </TotalSection>
  );

  return (
    <InvoiceContainer
      colors={colors}
      layout={layout}
      customSettings={customSettings}
    >
      <Header colors={colors} layout={layout} customSettings={customSettings}>
        <Box>{logo && <Logo src={logo.url} alt='Logo firmy' />}</Box>
        <Box sx={{ textAlign: 'right' }}>
          <InvoiceTitle colors={colors}>Faktura</InvoiceTitle>
        </Box>
      </Header>

      {renderInvoiceDetails()}

      <InfoSection layout={layout}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            {renderCompanyInfo(seller, 'Sprzedawca')}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderCompanyInfo(buyer, 'Nabywca')}
          </Grid>
        </Grid>
      </InfoSection>

      {renderItemsTable()}
      {renderTotals()}

      {notes && (
        <Box sx={{ mt: 5 }}>
          <SectionTitle colors={colors}>Uwagi</SectionTitle>
          <Typography
            variant='body2'
            sx={{ color: '#666', fontSize: '11px', lineHeight: 1.6 }}
          >
            {notes}
          </Typography>
        </Box>
      )}

      <Footer colors={colors} customSettings={customSettings}>
        <Typography variant='caption' sx={{ fontSize: '9px' }}>
          Faktura wygenerowana automatycznie
        </Typography>
      </Footer>
    </InvoiceContainer>
  );
};

export default MinimalTemplate;
