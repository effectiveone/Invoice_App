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

interface MinimalTemplateProps {
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
    fontFamily: customSettings?.fontFamily || 'Helvetica, Arial, sans-serif',
    fontSize: `${customSettings?.fontSize || 11}px`,
    lineHeight: 1.4,
    color: '#333',
    border: layout === 'bordered' ? '1px solid #ddd' : 'none',
  }),
);

const Header = styled(Box)<FullProps>(({ colors, layout, customSettings }) => ({
  marginBottom: '40px',
  padding: `${
    customSettings?.headerHeight ? customSettings.headerHeight / 4 : 20
  }px 0`,
  borderBottom:
    layout === 'underlined' ? `2px solid ${colors?.primary || '#333'}` : 'none',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

const Logo = styled('img')({
  maxHeight: '60px',
  maxWidth: '150px',
  objectFit: 'contain',
});

const InvoiceTitle = styled(Typography)<StyledProps>(({ colors }) => ({
  fontSize: '24px',
  fontWeight: '300',
  color: colors?.primary || '#333',
  letterSpacing: '1px',
}));

const SectionTitle = styled(Typography)<StyledProps>(({ colors }) => ({
  fontSize: '14px',
  fontWeight: '600',
  color: colors?.primary || '#333',
  marginBottom: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const InfoSection = styled(Box)<LayoutProps>(({ layout }) => ({
  marginBottom: '30px',
  padding: layout === 'boxed' ? '15px' : '0',
  border: layout === 'boxed' ? '1px solid #eee' : 'none',
  borderRadius: layout === 'boxed' ? '4px' : '0',
}));

const StyledTable = styled(Table)<StyledProps>(({ colors }) => ({
  '& .MuiTableHead-root': {
    '& .MuiTableCell-head': {
      backgroundColor: 'transparent',
      color: colors?.primary || '#333',
      fontWeight: '600',
      fontSize: '12px',
      borderBottom: `2px solid ${colors?.primary || '#333'}`,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableCell-root': {
      borderBottom: '1px solid #f0f0f0',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },
}));

const TotalSection = styled(Box)<StyledProps>(({ colors }) => ({
  marginTop: '30px',
  padding: '20px 0',
  borderTop: `1px solid ${colors?.primary || '#333'}`,
}));

const Footer = styled(Box)<CustomSettingsProps>(
  ({ colors, customSettings }) => ({
    marginTop: '40px',
    padding: `${
      customSettings?.footerHeight ? customSettings.footerHeight / 2 : 20
    }px 0`,
    borderTop: `1px solid ${colors?.primary || '#333'}`,
    textAlign: 'center',
    color: '#666',
    fontSize: '10px',
  }),
);

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({
  invoiceData,
  templateConfig = {},
  layout = 'clean',
  colors = { primary: '#333', secondary: '#666' },
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

  const renderCompanyInfo = (company: any, title: string) => (
    <InfoSection layout={layout}>
      <SectionTitle colors={colors}>{title}</SectionTitle>
      <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {company.name || 'Nazwa firmy'}
      </Typography>
      <Typography variant='caption' sx={{ display: 'block', mb: 0.5 }}>
        {company.address || 'Adres'}
      </Typography>
      <Typography variant='caption' sx={{ display: 'block', mb: 0.5 }}>
        {company.city || 'Miasto'}
      </Typography>
      <Typography variant='caption' sx={{ display: 'block' }}>
        NIP: {company.nip || 'NIP'}
      </Typography>
    </InfoSection>
  );

  const renderInvoiceDetails = () => (
    <InfoSection layout={layout}>
      <SectionTitle colors={colors}>Szczegóły</SectionTitle>
      <Typography variant='caption' sx={{ display: 'block', mb: 0.5 }}>
        Numer: {invoiceNumber}
      </Typography>
      <Typography variant='caption' sx={{ display: 'block', mb: 0.5 }}>
        Data: {issueDate}
      </Typography>
      <Typography variant='caption' sx={{ display: 'block' }}>
        Płatność: {dueDate}
      </Typography>
    </InfoSection>
  );

  const renderItemsTable = () => (
    <Box sx={{ mb: 4 }}>
      <SectionTitle colors={colors}>Pozycje</SectionTitle>
      <StyledTable colors={colors}>
        <TableHead>
          <TableRow>
            <TableCell>Lp.</TableCell>
            <TableCell>Opis</TableCell>
            <TableCell align='center'>Ilość</TableCell>
            <TableCell align='right'>Cena</TableCell>
            <TableCell align='center'>VAT</TableCell>
            <TableCell align='right'>Netto</TableCell>
            <TableCell align='right'>Brutto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell align='center'>
                {item.quantity} {item.unit}
              </TableCell>
              <TableCell align='right'>{item.price?.toFixed(2)}</TableCell>
              <TableCell align='center'>{item.vat}%</TableCell>
              <TableCell align='right'>
                {(item.netPrice || 0).toFixed(2)}
              </TableCell>
              <TableCell align='center'>{(item.vat || 0) * 100}%</TableCell>
              <TableCell align='right'>
                {(item.netValue || 0).toFixed(2)}
              </TableCell>
              <TableCell align='right'>
                {(item.grossValue || 0).toFixed(2)}
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
              <Typography variant='caption' sx={{ fontWeight: 'bold', mb: 1 }}>
                Płatność:
              </Typography>
              <Typography variant='caption' sx={{ display: 'block' }}>
                {paymentTerms}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='caption' sx={{ display: 'block', mb: 0.5 }}>
              Netto: {subtotal?.toFixed(2)} PLN
            </Typography>
            <Typography variant='caption' sx={{ display: 'block', mb: 0.5 }}>
              VAT: {taxAmount?.toFixed(2)} PLN
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant='body2'
              sx={{ color: colors?.primary, fontWeight: 'bold' }}
            >
              Razem: {total?.toFixed(2)} PLN
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
        <Box>
          {logo && <Logo src={logo.url} alt='Logo' />}
          <InvoiceTitle colors={colors}>FAKTURA</InvoiceTitle>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant='h6' sx={{ color: colors?.primary }}>
            {invoiceNumber}
          </Typography>
          <Typography variant='caption'>{issueDate}</Typography>
        </Box>
      </Header>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          {renderCompanyInfo(seller, 'Od')}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderCompanyInfo(buyer, 'Do')}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderInvoiceDetails()}
        </Grid>
      </Grid>

      {renderItemsTable()}
      {renderTotals()}

      {notes && (
        <Box sx={{ mt: 4 }}>
          <SectionTitle colors={colors}>Uwagi</SectionTitle>
          <Typography variant='caption'>{notes}</Typography>
        </Box>
      )}

      <Footer colors={colors} customSettings={customSettings}>
        <Typography variant='caption'>Dokument elektroniczny</Typography>
      </Footer>
    </InvoiceContainer>
  );
};

export default MinimalTemplate;
