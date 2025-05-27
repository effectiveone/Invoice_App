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
    fontFamily: customSettings?.fontFamily || 'Arial, sans-serif',
    fontSize: `${customSettings?.fontSize || 12}px`,
    lineHeight: 1.6,
    color: '#333',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    position: 'relative',
  }),
);

const Header = styled(Box)(({ colors, layout, customSettings }) => ({
  marginBottom: '30px',
  padding: `${
    customSettings?.headerHeight ? customSettings.headerHeight / 4 : 25
  }px`,
  background:
    layout === 'header-focused'
      ? `linear-gradient(135deg, ${colors?.primary || '#667eea'} 0%, ${
          colors?.secondary || '#764ba2'
        } 100%)`
      : 'transparent',
  borderRadius: layout === 'header-focused' ? '12px' : '0',
  color: layout === 'header-focused' ? 'white' : 'inherit',
  display: 'flex',
  flexDirection: layout === 'two-column' ? 'row' : 'column',
  justifyContent: 'space-between',
  alignItems: layout === 'two-column' ? 'flex-start' : 'flex-start',
  gap: '20px',
}));

const Logo = styled('img')({
  maxHeight: '80px',
  maxWidth: '200px',
  objectFit: 'contain',
});

const CompanyInfo = styled(Box)(({ layout }) => ({
  flex: layout === 'two-column' ? 1 : 'unset',
}));

const InvoiceTitle = styled(Typography)(({ colors }) => ({
  fontSize: '28px',
  fontWeight: 'bold',
  color: colors?.primary || '#667eea',
  marginBottom: '10px',
}));

const SectionTitle = styled(Typography)(({ colors }) => ({
  fontSize: '16px',
  fontWeight: '600',
  color: colors?.primary || '#667eea',
  marginBottom: '15px',
  borderBottom: `2px solid ${colors?.primary || '#667eea'}`,
  paddingBottom: '5px',
}));

const InfoGrid = styled(Grid)(({ layout }) => ({
  marginBottom: '30px',
  '& .MuiGrid-item': {
    padding: layout === 'grid' ? '15px' : '8px',
  },
}));

const StyledTable = styled(Table)(({ colors }) => ({
  '& .MuiTableHead-root': {
    backgroundColor: colors?.primary || '#667eea',
    '& .MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root:nth-of-type(even)': {
      backgroundColor: 'rgba(102, 126, 234, 0.05)',
    },
  },
  '& .MuiTableCell-root': {
    borderBottom: '1px solid #e0e0e0',
    padding: '12px 16px',
  },
}));

const TotalSection = styled(Box)(({ colors }) => ({
  marginTop: '30px',
  padding: '20px',
  backgroundColor: `${colors?.primary || '#667eea'}10`,
  borderRadius: '8px',
  border: `2px solid ${colors?.primary || '#667eea'}`,
}));

const Footer = styled(Box)(({ colors, customSettings }) => ({
  marginTop: '40px',
  padding: `${
    customSettings?.footerHeight ? customSettings.footerHeight / 2 : 25
  }px 0`,
  borderTop: `2px solid ${colors?.primary || '#667eea'}`,
  textAlign: 'center',
  color: '#666',
  fontSize: '12px',
}));

const ModernTemplate = ({
  invoiceData,
  templateConfig = {},
  layout = 'classic',
  colors = { primary: '#667eea', secondary: '#764ba2' },
  logo,
  customSettings = {},
}) => {
  const {
    invoiceNumber = 'INV-001',
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
    <Box>
      <SectionTitle colors={colors}>{title}</SectionTitle>
      <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1 }}>
        {company.name || 'Nazwa firmy'}
      </Typography>
      <Typography variant='body2'>{company.address || 'Adres'}</Typography>
      <Typography variant='body2'>{company.city || 'Miasto'}</Typography>
      <Typography variant='body2'>NIP: {company.nip || 'NIP'}</Typography>
      {company.phone && (
        <Typography variant='body2'>Tel: {company.phone}</Typography>
      )}
      {company.email && (
        <Typography variant='body2'>Email: {company.email}</Typography>
      )}
    </Box>
  );

  const renderInvoiceDetails = () => (
    <Box>
      <SectionTitle colors={colors}>Szczegóły faktury</SectionTitle>
      <Typography variant='body2'>
        <strong>Numer:</strong> {invoiceNumber}
      </Typography>
      <Typography variant='body2'>
        <strong>Data wystawienia:</strong> {issueDate}
      </Typography>
      <Typography variant='body2'>
        <strong>Termin płatności:</strong> {dueDate}
      </Typography>
    </Box>
  );

  const renderItemsTable = () => (
    <Box sx={{ mb: 4 }}>
      <SectionTitle colors={colors}>Pozycje faktury</SectionTitle>
      <StyledTable colors={colors}>
        <TableHead>
          <TableRow>
            <TableCell>Lp.</TableCell>
            <TableCell>Nazwa</TableCell>
            <TableCell align='center'>Ilość</TableCell>
            <TableCell align='right'>Cena netto</TableCell>
            <TableCell align='center'>VAT %</TableCell>
            <TableCell align='right'>Wartość netto</TableCell>
            <TableCell align='right'>Wartość brutto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell align='center'>
                {item.quantity} {item.unit}
              </TableCell>
              <TableCell align='right'>{item.price?.toFixed(2)} zł</TableCell>
              <TableCell align='center'>{item.vat}%</TableCell>
              <TableCell align='right'>
                {(item.quantity * item.price)?.toFixed(2)} zł
              </TableCell>
              <TableCell align='right'>
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
    <TotalSection colors={colors}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {paymentTerms && (
            <Box>
              <Typography
                variant='subtitle2'
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                Warunki płatności:
              </Typography>
              <Typography variant='body2'>{paymentTerms}</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='body1'>
              <strong>Wartość netto: {subtotal?.toFixed(2)} zł</strong>
            </Typography>
            <Typography variant='body1'>
              <strong>VAT: {taxAmount?.toFixed(2)} zł</strong>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant='h6'
              sx={{ color: colors?.primary, fontWeight: 'bold' }}
            >
              <strong>Do zapłaty: {total?.toFixed(2)} zł</strong>
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
      <Header colors={colors} layout={layout} customSettings={customSettings}>
        <CompanyInfo layout={layout}>
          {logo && <Logo src={logo.url} alt='Logo firmy' />}
          <InvoiceTitle colors={colors}>FAKTURA</InvoiceTitle>
        </CompanyInfo>
        {layout === 'two-column' && renderInvoiceDetails()}
      </Header>

      {layout !== 'two-column' && (
        <Box sx={{ mb: 4 }}>{renderInvoiceDetails()}</Box>
      )}

      <InfoGrid container spacing={layout === 'grid' ? 3 : 4} layout={layout}>
        <Grid item xs={12} md={layout === 'sidebar' ? 8 : 6}>
          {renderCompanyInfo(seller, 'Sprzedawca')}
        </Grid>
        <Grid item xs={12} md={layout === 'sidebar' ? 4 : 6}>
          {renderCompanyInfo(buyer, 'Nabywca')}
        </Grid>
      </InfoGrid>

      {renderItemsTable()}
      {renderTotals()}

      {notes && (
        <Box sx={{ mt: 4 }}>
          <SectionTitle colors={colors}>Uwagi</SectionTitle>
          <Typography variant='body2'>{notes}</Typography>
        </Box>
      )}

      <Footer colors={colors} customSettings={customSettings}>
        <Typography variant='caption'>
          Ta faktura została wygenerowana automatycznie przez system InvoiceApp
        </Typography>
      </Footer>
    </InvoiceContainer>
  );
};

export default ModernTemplate;
