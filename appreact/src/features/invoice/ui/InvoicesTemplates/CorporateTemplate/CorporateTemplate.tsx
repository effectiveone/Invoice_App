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
import { styled } from '@mui/material/styles';
import { useInvoiceContext } from '../../../../../entities/invoice/model/useInvoiceContext';

// Interfejsy typów dla styled components
interface StyledProps {
  colors?: {
    primary: string;
    secondary: string;
  };
}

interface HeaderProps extends StyledProps {
  layout?: string;
  customSettings?: {
    headerHeight?: number;
    footerHeight?: number;
  };
}

interface InvoiceTitleProps extends StyledProps {
  layout?: string;
}

interface CorporateTemplateProps {
  colors?: {
    primary: string;
    secondary: string;
  };
  customSettings?: {
    headerHeight?: number;
    footerHeight?: number;
  };
  logo?: {
    url: string;
  } | null;
  layout?: string;
}

const InvoiceContainer = styled(Box)({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: 'white',
  boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  position: 'relative',
});

const Header = styled(Box)<HeaderProps>(
  ({ colors, layout, customSettings }) => ({
    marginBottom: '40px',
    padding: `${
      customSettings?.headerHeight ? customSettings.headerHeight / 4 : 30
    }px 0`,
    background:
      layout === 'sidebar'
        ? 'transparent'
        : `linear-gradient(135deg, ${colors?.primary || '#667eea'} 0%, ${
            colors?.secondary || '#764ba2'
          } 100%)`,
    borderRadius: layout === 'sidebar' ? '0' : '12px',
    color: layout === 'sidebar' ? '#2c2c2c' : 'white',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255,255,255,0.1)',
      transform: 'skewY(-2deg)',
      transformOrigin: 'top left',
    },
  }),
);

const Logo = styled('img')({
  maxHeight: '60px',
  marginBottom: '15px',
});

const InvoiceTitle = styled(Typography)<InvoiceTitleProps>(
  ({ colors, layout }) => ({
    fontSize: '32px',
    fontWeight: 'bold',
    color: layout === 'sidebar' ? colors?.primary || '#667eea' : 'white',
    textShadow: layout === 'sidebar' ? 'none' : '2px 2px 4px rgba(0,0,0,0.3)',
    position: 'relative',
    zIndex: 1,
  }),
);

const SectionTitle = styled(Typography)<StyledProps>(({ colors }) => ({
  fontSize: '18px',
  fontWeight: 'bold',
  color: colors?.primary || '#667eea',
  marginBottom: '15px',
  borderBottom: `2px solid ${colors?.primary || '#667eea'}`,
  paddingBottom: '8px',
  display: 'inline-block',
}));

const InfoCard = styled(Box)<StyledProps>(({ colors }) => ({
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: `1px solid ${colors?.primary || '#667eea'}20`,
  marginBottom: '20px',
}));

const StyledTable = styled(Table)<StyledProps>(({ colors }) => ({
  '& .MuiTableHead-root': {
    backgroundColor: colors?.primary || '#667eea',
    '& .MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root': {
      '&:nth-of-type(even)': {
        backgroundColor: '#f8f9fa',
      },
      '&:hover': {
        backgroundColor: `${colors?.primary || '#667eea'}10`,
      },
    },
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${colors?.primary || '#667eea'}20`,
      fontSize: '13px',
    },
  },
}));

const TotalSection = styled(Box)<StyledProps>(({ colors }) => ({
  marginTop: '40px',
  padding: '30px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  border: `2px solid ${colors?.primary || '#667eea'}`,
}));

const Footer = styled(Box)<HeaderProps>(({ colors, customSettings }) => ({
  marginTop: '50px',
  padding: `${
    customSettings?.footerHeight ? customSettings.footerHeight / 2 : 30
  }px 0`,
  borderTop: `3px solid ${colors?.primary || '#667eea'}`,
  textAlign: 'center',
  color: '#666',
}));

const Sidebar = styled(Box)<StyledProps>(({ colors }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  width: '200px',
  height: '100%',
  background: `linear-gradient(180deg, ${colors?.primary || '#667eea'} 0%, ${
    colors?.secondary || '#764ba2'
  } 100%)`,
  borderRadius: '0 12px 12px 0',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-20px',
    top: 0,
    bottom: 0,
    width: '20px',
    background: `linear-gradient(180deg, ${colors?.primary || '#667eea'} 0%, ${
      colors?.secondary || '#764ba2'
    } 100%)`,
    transform: 'skewX(-10deg)',
  },
}));

const CorporateTemplate: React.FC<CorporateTemplateProps> = ({
  colors = { primary: '#667eea', secondary: '#764ba2' },
  customSettings = {},
  logo = null,
  layout = 'default',
}) => {
  // Pobierz prawdziwe dane z kontekstu faktury
  const {
    currentInvoiceNumber,
    invoiceDates,
    invoicePaymentDate,
    companyData,
    selectedKontrahent,
    items,
    totalNetValue,
    totalGrossValue,
    notes,
  } = useInvoiceContext();

  // Przygotuj dane sprzedawcy z danych firmy
  const seller = {
    name: companyData?.companyName || 'Nazwa firmy',
    address: companyData?.street || 'Adres',
    city: `${companyData?.zipCode || ''} ${
      companyData?.city || 'Miasto'
    }`.trim(),
    nip: companyData?.nip || 'NIP',
    regon: companyData?.regon || '',
  };

  // Przygotuj dane nabywcy z wybranego kontrahenta
  const buyer = {
    name: selectedKontrahent?.kontrahent_companyName || 'Nazwa klienta',
    address: selectedKontrahent?.kontrahent_street || 'Adres klienta',
    city: `${selectedKontrahent?.kontrahent_zipCode || ''} ${
      selectedKontrahent?.kontrahent_city || 'Miasto'
    }`.trim(),
    nip: selectedKontrahent?.kontrahent_nip || 'NIP klienta',
  };

  // Oblicz sumy
  const totals = {
    netTotal: totalNetValue || 0,
    vatTotal: (totalGrossValue || 0) - (totalNetValue || 0),
    grossTotal: totalGrossValue || 0,
  };

  const paymentTerms = 'Przelew bankowy - 14 dni';

  const renderCompanyInfo = (company: any, title: string) => (
    <InfoCard colors={colors}>
      <SectionTitle colors={colors}>{title}</SectionTitle>
      <Typography
        variant='h6'
        sx={{ fontWeight: 'bold', mb: 2, color: '#2c2c2c' }}
      >
        {company.name}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, color: '#666' }}>
        {company.address}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, color: '#666' }}>
        {company.city}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, color: '#666' }}>
        <strong>NIP:</strong> {company.nip}
      </Typography>
      {company.regon && (
        <Typography variant='body2' sx={{ color: '#666' }}>
          <strong>REGON:</strong> {company.regon}
        </Typography>
      )}
    </InfoCard>
  );

  const renderInvoiceDetails = () => (
    <InfoCard colors={colors}>
      <SectionTitle colors={colors}>Szczegóły faktury</SectionTitle>
      <Typography variant='body2' sx={{ mb: 1, color: '#666' }}>
        <strong>Numer faktury:</strong> {currentInvoiceNumber || 'FV/2024/001'}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, color: '#666' }}>
        <strong>Data wystawienia:</strong>{' '}
        {invoiceDates || new Date().toLocaleDateString('pl-PL')}
      </Typography>
      <Typography variant='body2' sx={{ color: '#666' }}>
        <strong>Termin płatności:</strong>{' '}
        {invoicePaymentDate || new Date().toLocaleDateString('pl-PL')}
      </Typography>
    </InfoCard>
  );

  const renderItemsTable = () => (
    <Box sx={{ mb: 4 }}>
      <SectionTitle colors={colors}>Pozycje na fakturze</SectionTitle>
      <StyledTable colors={colors}>
        <TableHead>
          <TableRow>
            <TableCell>Lp.</TableCell>
            <TableCell>Nazwa towaru/usługi</TableCell>
            <TableCell align='center'>Ilość</TableCell>
            <TableCell align='center'>Jedn.</TableCell>
            <TableCell align='right'>Cena netto</TableCell>
            <TableCell align='center'>VAT %</TableCell>
            <TableCell align='right'>Wartość netto</TableCell>
            <TableCell align='right'>Kwota VAT</TableCell>
            <TableCell align='right'>Wartość brutto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(items || []).map((item, index) => {
            const vatRate = (item.vat || 0) * 100; // Konwersja z ułamka na procenty
            const netValue = item.netValue || 0;
            const grossValue = item.grossValue || 0;
            const vatValue = grossValue - netValue;

            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name || ''}</TableCell>
                <TableCell align='center'>{item.quantity || 0}</TableCell>
                <TableCell align='center'>{item.unit || 'szt'}</TableCell>
                <TableCell align='right'>
                  {(item.netPrice || 0).toFixed(2)} zł
                </TableCell>
                <TableCell align='center'>{vatRate.toFixed(0)}%</TableCell>
                <TableCell align='right'>{netValue.toFixed(2)} zł</TableCell>
                <TableCell align='right'>{vatValue.toFixed(2)} zł</TableCell>
                <TableCell align='right'>
                  <strong>{grossValue.toFixed(2)} zł</strong>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </Box>
  );

  const renderTotals = () => (
    <TotalSection colors={colors}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          {paymentTerms && (
            <Box sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
                Warunki płatności:
              </Typography>
              <Typography variant='body1'>{paymentTerms}</Typography>
            </Box>
          )}
          {notes && (
            <Box sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
                Uwagi:
              </Typography>
              <Typography variant='body1'>{notes}</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='body1' sx={{ mb: 1 }}>
              <strong>Suma netto: {totals.netTotal.toFixed(2)} zł</strong>
            </Typography>
            <Typography variant='body1' sx={{ mb: 1 }}>
              <strong>Suma VAT: {totals.vatTotal.toFixed(2)} zł</strong>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                color: colors.primary,
                fontSize: '18px',
              }}
            >
              Do zapłaty: {totals.grossTotal.toFixed(2)} zł
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </TotalSection>
  );

  return (
    <InvoiceContainer
      sx={{
        colors: colors,
        layout: layout,
        customSettings: customSettings,
      }}
    >
      {layout === 'sidebar' && <Sidebar colors={colors} />}

      <Header colors={colors} layout={layout} customSettings={customSettings}>
        <Box>
          {logo && <Logo src={logo.url} alt='Logo firmy' />}
          <InvoiceTitle colors={colors} layout={layout}>
            FAKTURA
          </InvoiceTitle>
        </Box>
      </Header>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          {renderCompanyInfo(seller, 'Sprzedawca')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderCompanyInfo(buyer, 'Nabywca')}
        </Grid>
      </Grid>

      {renderInvoiceDetails()}
      {renderItemsTable()}
      {renderTotals()}

      <Footer colors={colors} customSettings={customSettings}>
        <Typography variant='body2' sx={{ color: '#888' }}>
          Dziękujemy za współpracę!
        </Typography>
      </Footer>
    </InvoiceContainer>
  );
};

export default CorporateTemplate;
