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

interface LayoutProps extends StyledProps {
  layout?: string;
}

interface CustomSettingsProps extends StyledProps {
  customSettings?: {
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    headerHeight?: number;
    footerHeight?: number;
    fontFamily?: string;
    fontSize?: number;
  };
}

interface FullProps extends LayoutProps, CustomSettingsProps {}

interface ModernTemplateProps {
  invoiceData?: any;
  templateConfig?: any;
  layout?: string;
  colors?: {
    primary: string;
    secondary: string;
  };
  logo?: {
    url: string;
  } | null;
  customSettings?: {
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    headerHeight?: number;
    footerHeight?: number;
    fontFamily?: string;
    fontSize?: number;
  };
}

const InvoiceContainer = styled(Box)<FullProps>(
  ({ colors, layout, customSettings }) => ({
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

const Header = styled(Box)<FullProps>(({ colors, layout, customSettings }) => ({
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

const CompanyInfo = styled(Box)<LayoutProps>(({ layout }) => ({
  flex: layout === 'two-column' ? 1 : 'unset',
}));

const InvoiceTitle = styled(Typography)<StyledProps>(({ colors }) => ({
  fontSize: '28px',
  fontWeight: 'bold',
  color: colors?.primary || '#667eea',
  marginBottom: '10px',
}));

const SectionTitle = styled(Typography)<StyledProps>(({ colors }) => ({
  fontSize: '16px',
  fontWeight: '600',
  color: colors?.primary || '#667eea',
  marginBottom: '15px',
  borderBottom: `2px solid ${colors?.primary || '#667eea'}`,
  paddingBottom: '5px',
}));

const InfoGrid = styled(Grid)<LayoutProps>(({ layout }) => ({
  marginBottom: '30px',
  '& .MuiGrid-item': {
    padding: layout === 'grid' ? '15px' : '8px',
  },
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
    '& .MuiTableRow-root:nth-of-type(even)': {
      backgroundColor: 'rgba(102, 126, 234, 0.05)',
    },
  },
  '& .MuiTableCell-root': {
    borderBottom: '1px solid #e0e0e0',
    padding: '12px 16px',
  },
}));

const TotalSection = styled(Box)<StyledProps>(({ colors }) => ({
  marginTop: '30px',
  padding: '20px',
  backgroundColor: `${colors?.primary || '#667eea'}10`,
  borderRadius: '8px',
  border: `2px solid ${colors?.primary || '#667eea'}`,
}));

const Footer = styled(Box)<CustomSettingsProps>(
  ({ colors, customSettings }) => ({
    marginTop: '40px',
    padding: `${
      customSettings?.footerHeight ? customSettings.footerHeight / 2 : 25
    }px 0`,
    borderTop: `2px solid ${colors?.primary || '#667eea'}`,
    textAlign: 'center',
    color: '#666',
    fontSize: '12px',
  }),
);

const ModernTemplate: React.FC<ModernTemplateProps> = ({
  invoiceData,
  templateConfig = {},
  layout = 'classic',
  colors = { primary: '#667eea', secondary: '#764ba2' },
  logo,
  customSettings = {},
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
    phone: companyData?.phone || '',
    email: companyData?.email || '',
  };

  // Przygotuj dane nabywcy z wybranego kontrahenta
  const buyer = {
    name: selectedKontrahent?.kontrahent_companyName || 'Nazwa klienta',
    address: selectedKontrahent?.kontrahent_street || 'Adres klienta',
    city: `${selectedKontrahent?.kontrahent_zipCode || ''} ${
      selectedKontrahent?.kontrahent_city || 'Miasto'
    }`.trim(),
    nip: selectedKontrahent?.kontrahent_nip || 'NIP klienta',
    phone: selectedKontrahent?.kontrahent_phone || '',
    email: selectedKontrahent?.kontrahent_email || '',
  };

  // Oblicz sumy
  const subtotal = totalNetValue || 0;
  const taxAmount = (totalGrossValue || 0) - (totalNetValue || 0);
  const total = totalGrossValue || 0;
  const paymentTerms = 'Przelew bankowy - 14 dni';

  const renderCompanyInfo = (company: any, title: string) => (
    <Box>
      <SectionTitle colors={colors}>{title}</SectionTitle>
      <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1 }}>
        {company.name}
      </Typography>
      <Typography variant='body2'>{company.address}</Typography>
      <Typography variant='body2'>{company.city}</Typography>
      <Typography variant='body2'>NIP: {company.nip}</Typography>
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
        <strong>Numer:</strong> {currentInvoiceNumber || 'INV-001'}
      </Typography>
      <Typography variant='body2'>
        <strong>Data wystawienia:</strong>{' '}
        {invoiceDates || new Date().toLocaleDateString('pl-PL')}
      </Typography>
      <Typography variant='body2'>
        <strong>Termin płatności:</strong>{' '}
        {invoicePaymentDate || new Date().toLocaleDateString('pl-PL')}
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
          {(items || []).map((item: any, index: number) => {
            const vatRate = (item.vat || 0) * 100; // Konwersja z ułamka na procenty
            const netValue = item.netValue || 0;
            const grossValue = item.grossValue || 0;

            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name || ''}</TableCell>
                <TableCell align='center'>
                  {item.quantity || 0} {item.unit || 'szt'}
                </TableCell>
                <TableCell align='right'>
                  {(item.netPrice || 0).toFixed(2)} PLN
                </TableCell>
                <TableCell align='center'>{vatRate.toFixed(0)}%</TableCell>
                <TableCell align='right'>{netValue.toFixed(2)} PLN</TableCell>
                <TableCell align='right'>{grossValue.toFixed(2)} PLN</TableCell>
              </TableRow>
            );
          })}
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
              <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
                Warunki płatności:
              </Typography>
              <Typography variant='body2'>{paymentTerms}</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='body1' sx={{ mb: 1 }}>
              <strong>Wartość netto: {subtotal.toFixed(2)} PLN</strong>
            </Typography>
            <Typography variant='body1' sx={{ mb: 1 }}>
              <strong>Podatek VAT: {taxAmount.toFixed(2)} PLN</strong>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant='h6'
              sx={{ color: colors?.primary, fontWeight: 'bold' }}
            >
              DO ZAPŁATY: {total.toFixed(2)} PLN
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

      <InfoGrid container spacing={4} layout={layout}>
        <Grid item xs={12} md={layout === 'grid' ? 4 : 6}>
          {renderCompanyInfo(seller, 'Sprzedawca')}
        </Grid>
        <Grid item xs={12} md={layout === 'grid' ? 4 : 6}>
          {renderCompanyInfo(buyer, 'Nabywca')}
        </Grid>
        {layout === 'grid' && (
          <Grid item xs={12} md={4}>
            {renderInvoiceDetails()}
          </Grid>
        )}
      </InfoGrid>

      {layout !== 'two-column' && layout !== 'grid' && renderInvoiceDetails()}
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
          Dokument wygenerowany automatycznie
        </Typography>
      </Footer>
    </InvoiceContainer>
  );
};

export default ModernTemplate;
