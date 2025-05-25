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
    padding: `${customSettings?.marginTop || 20}mm ${
      customSettings?.marginRight || 20
    }mm ${customSettings?.marginBottom || 20}mm ${
      customSettings?.marginLeft || 20
    }mm`,
    backgroundColor: 'white',
    fontFamily: customSettings?.fontFamily || 'Georgia, serif',
    fontSize: `${customSettings?.fontSize || 12}px`,
    lineHeight: 1.5,
    color: '#2c2c2c',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    position: 'relative',
  }),
);

const Header = styled(Box)(({ colors, layout, customSettings }) => ({
  marginBottom: '40px',
  padding: `${
    customSettings?.headerHeight ? customSettings.headerHeight / 4 : 30
  }px`,
  background:
    layout === 'sidebar'
      ? 'transparent'
      : `linear-gradient(90deg, ${colors?.primary || '#667eea'} 0%, ${
          colors?.secondary || '#764ba2'
        } 100%)`,
  color: layout === 'sidebar' ? 'inherit' : 'white',
  display: 'flex',
  flexDirection: layout === 'sidebar' ? 'column' : 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderLeft:
    layout === 'sidebar' ? `6px solid ${colors?.primary || '#667eea'}` : 'none',
  paddingLeft:
    layout === 'sidebar'
      ? '20px'
      : customSettings?.headerHeight
      ? customSettings.headerHeight / 4
      : 30,
}));

const Logo = styled('img')({
  maxHeight: '100px',
  maxWidth: '250px',
  objectFit: 'contain',
});

const InvoiceTitle = styled(Typography)(({ colors, layout }) => ({
  fontSize: '32px',
  fontWeight: 'bold',
  color: layout === 'sidebar' ? colors?.primary || '#667eea' : 'white',
  marginBottom: '10px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
}));

const SectionTitle = styled(Typography)(({ colors }) => ({
  fontSize: '18px',
  fontWeight: 'bold',
  color: colors?.primary || '#667eea',
  marginBottom: '20px',
  borderBottom: `3px solid ${colors?.primary || '#667eea'}`,
  paddingBottom: '8px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
}));

const InfoCard = styled(Box)(({ colors }) => ({
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: `1px solid ${colors?.primary || '#667eea'}20`,
  marginBottom: '20px',
}));

const StyledTable = styled(Table)(({ colors }) => ({
  '& .MuiTableHead-root': {
    backgroundColor: colors?.primary || '#667eea',
    '& .MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root:nth-of-type(even)': {
      backgroundColor: '#f8f9fa',
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: `${colors?.primary || '#667eea'}10`,
    },
  },
  '& .MuiTableCell-root': {
    borderBottom: '1px solid #dee2e6',
    padding: '16px',
    fontSize: '13px',
  },
}));

const TotalSection = styled(Box)(({ colors }) => ({
  marginTop: '40px',
  padding: '30px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  border: `3px solid ${colors?.primary || '#667eea'}`,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}));

const Footer = styled(Box)(({ colors, customSettings }) => ({
  marginTop: '50px',
  padding: `${
    customSettings?.footerHeight ? customSettings.footerHeight / 2 : 30
  }px 0`,
  borderTop: `3px solid ${colors?.primary || '#667eea'}`,
  textAlign: 'center',
  color: '#6c757d',
  fontSize: '11px',
  backgroundColor: '#f8f9fa',
}));

const Sidebar = styled(Box)(({ colors }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  width: '150px',
  height: '100%',
  backgroundColor: `${colors?.primary || '#667eea'}10`,
  borderLeft: `4px solid ${colors?.primary || '#667eea'}`,
}));

const CorporateTemplate = ({
  invoiceData,
  templateConfig = {},
  layout = 'classic',
  colors = { primary: '#667eea', secondary: '#764ba2' },
  logo,
  customSettings = {},
}) => {
  const {
    invoiceNumber = 'CORP-001',
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
    <InfoCard colors={colors}>
      <SectionTitle colors={colors}>{title}</SectionTitle>
      <Typography
        variant='h6'
        sx={{ fontWeight: 'bold', mb: 2, color: '#2c2c2c' }}
      >
        {company.name || 'Nazwa firmy'}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, color: '#495057' }}>
        {company.address || 'Adres'}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, color: '#495057' }}>
        {company.city || 'Miasto'}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, fontWeight: 'bold' }}>
        NIP: {company.nip || 'NIP'}
      </Typography>
      {company.phone && (
        <Typography variant='body2' sx={{ color: '#495057' }}>
          Tel: {company.phone}
        </Typography>
      )}
      {company.email && (
        <Typography variant='body2' sx={{ color: '#495057' }}>
          Email: {company.email}
        </Typography>
      )}
    </InfoCard>
  );

  const renderInvoiceDetails = () => (
    <InfoCard colors={colors}>
      <SectionTitle colors={colors}>Szczegóły dokumentu</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1 }}>
            Numer faktury:
          </Typography>
          <Typography
            variant='h6'
            sx={{ color: colors?.primary, fontWeight: 'bold' }}
          >
            {invoiceNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1 }}>
            Data wystawienia:
          </Typography>
          <Typography variant='body1'>{issueDate}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1 }}>
            Termin płatności:
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: '#dc3545', fontWeight: 'bold' }}
          >
            {dueDate}
          </Typography>
        </Grid>
      </Grid>
    </InfoCard>
  );

  const renderItemsTable = () => (
    <Box sx={{ mb: 4 }}>
      <SectionTitle colors={colors}>Pozycje na fakturze</SectionTitle>
      <StyledTable colors={colors}>
        <TableHead>
          <TableRow>
            <TableCell>Lp.</TableCell>
            <TableCell>Opis towaru/usługi</TableCell>
            <TableCell align='center'>Ilość</TableCell>
            <TableCell align='right'>Cena jednostkowa netto</TableCell>
            <TableCell align='center'>VAT</TableCell>
            <TableCell align='right'>Wartość netto</TableCell>
            <TableCell align='right'>Wartość brutto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
              <TableCell sx={{ fontWeight: '500' }}>{item.name}</TableCell>
              <TableCell align='center'>
                {item.quantity} {item.unit}
              </TableCell>
              <TableCell align='right'>{item.price?.toFixed(2)} PLN</TableCell>
              <TableCell align='center'>{item.vat}%</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                {(item.quantity * item.price)?.toFixed(2)} PLN
              </TableCell>
              <TableCell
                align='right'
                sx={{ fontWeight: 'bold', color: colors?.primary }}
              >
                {(item.quantity * item.price * (1 + item.vat / 100))?.toFixed(
                  2,
                )}{' '}
                PLN
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );

  const renderTotals = () => (
    <TotalSection colors={colors}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          {paymentTerms && (
            <Box>
              <Typography
                variant='h6'
                sx={{ fontWeight: 'bold', mb: 2, color: colors?.primary }}
              >
                Warunki płatności:
              </Typography>
              <Typography variant='body1' sx={{ color: '#495057' }}>
                {paymentTerms}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='h6' sx={{ mb: 1, color: '#6c757d' }}>
              Podsumowanie finansowe:
            </Typography>
            <Typography variant='body1' sx={{ mb: 1 }}>
              <strong>Wartość netto: {subtotal?.toFixed(2)} PLN</strong>
            </Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
              <strong>Podatek VAT: {taxAmount?.toFixed(2)} PLN</strong>
            </Typography>
            <Divider sx={{ my: 2, borderWidth: 2 }} />
            <Typography
              variant='h4'
              sx={{ color: colors?.primary, fontWeight: 'bold' }}
            >
              DO ZAPŁATY: {total?.toFixed(2)} PLN
            </Typography>
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
      {layout === 'sidebar' && <Sidebar colors={colors} />}

      <Header colors={colors} layout={layout} customSettings={customSettings}>
        <Box>
          {logo && <Logo src={logo.url} alt='Logo firmy' />}
          <InvoiceTitle colors={colors} layout={layout}>
            FAKTURA
          </InvoiceTitle>
        </Box>
        {layout !== 'sidebar' && (
          <Box sx={{ textAlign: 'right' }}>
            <Typography
              variant='h5'
              sx={{ color: 'white', fontWeight: 'bold' }}
            >
              {invoiceNumber}
            </Typography>
            <Typography variant='body1' sx={{ color: 'rgba(255,255,255,0.9)' }}>
              {issueDate}
            </Typography>
          </Box>
        )}
      </Header>

      {layout === 'sidebar' && renderInvoiceDetails()}

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={layout === 'sidebar' ? 12 : 6}>
          {renderCompanyInfo(seller, 'Dane sprzedawcy')}
        </Grid>
        <Grid item xs={12} md={layout === 'sidebar' ? 12 : 6}>
          {renderCompanyInfo(buyer, 'Dane nabywcy')}
        </Grid>
      </Grid>

      {layout !== 'sidebar' && renderInvoiceDetails()}
      {renderItemsTable()}
      {renderTotals()}

      {notes && (
        <Box sx={{ mt: 4 }}>
          <SectionTitle colors={colors}>Uwagi dodatkowe</SectionTitle>
          <InfoCard colors={colors}>
            <Typography variant='body1' sx={{ color: '#495057' }}>
              {notes}
            </Typography>
          </InfoCard>
        </Box>
      )}

      <Footer colors={colors} customSettings={customSettings}>
        <Typography variant='caption' sx={{ fontWeight: 'bold' }}>
          DOKUMENT WYGENEROWANY AUTOMATYCZNIE - NIEWYMAGAJĄCY PODPISU
        </Typography>
        <br />
        <Typography variant='caption'>
          Faktura zgodna z ustawą o rachunkowości oraz ustawą o VAT
        </Typography>
      </Footer>
    </InvoiceContainer>
  );
};

export default CorporateTemplate;
