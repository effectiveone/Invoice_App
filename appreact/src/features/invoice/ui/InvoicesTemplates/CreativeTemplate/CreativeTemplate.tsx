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

interface CreativeTemplateProps {
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
    fontFamily: customSettings?.fontFamily || 'Roboto, Arial, sans-serif',
    fontSize: `${customSettings?.fontSize || 12}px`,
    lineHeight: 1.6,
    color: '#2c2c2c',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: layout === 'artistic' ? '200px' : '100px',
      height: layout === 'artistic' ? '200px' : '100px',
      background: `linear-gradient(135deg, ${
        colors?.primary || '#ff6b6b'
      } 0%, ${colors?.secondary || '#4ecdc4'} 100%)`,
      borderRadius: '50%',
      transform: 'translate(50%, -50%)',
      opacity: 0.1,
      zIndex: 0,
    },
  }),
);

const Header = styled(Box)<FullProps>(({ colors, layout, customSettings }) => ({
  marginBottom: '40px',
  padding: `${
    customSettings?.headerHeight ? customSettings.headerHeight / 4 : 30
  }px`,
  background:
    layout === 'gradient'
      ? `linear-gradient(135deg, ${colors?.primary || '#ff6b6b'} 0%, ${
          colors?.secondary || '#4ecdc4'
        } 100%)`
      : layout === 'artistic'
      ? `radial-gradient(circle at top right, ${
          colors?.primary || '#ff6b6b'
        } 0%, ${colors?.secondary || '#4ecdc4'} 70%, transparent 70%)`
      : 'transparent',
  borderRadius: layout === 'gradient' ? '20px' : '0',
  color: layout === 'gradient' ? 'white' : 'inherit',
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&::after':
    layout === 'artistic'
      ? {
          content: '""',
          position: 'absolute',
          bottom: '-20px',
          left: '-20px',
          width: '100px',
          height: '100px',
          background: `linear-gradient(45deg, ${
            colors?.secondary || '#4ecdc4'
          } 0%, ${colors?.primary || '#ff6b6b'} 100%)`,
          borderRadius: '50%',
          opacity: 0.2,
        }
      : {},
}));

const Logo = styled('img')({
  maxHeight: '80px',
  maxWidth: '200px',
  objectFit: 'contain',
  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
});

const InvoiceTitle = styled(Typography)<LayoutProps>(({ colors, layout }) => ({
  fontSize: layout === 'artistic' ? '36px' : '28px',
  fontWeight: layout === 'artistic' ? '900' : 'bold',
  color: layout === 'gradient' ? 'white' : colors?.primary || '#ff6b6b',
  textShadow:
    layout === 'gradient'
      ? '2px 2px 4px rgba(0,0,0,0.3)'
      : layout === 'artistic'
      ? `3px 3px 0px ${colors?.secondary || '#4ecdc4'}`
      : 'none',
  letterSpacing: layout === 'artistic' ? '2px' : '1px',
  transform: layout === 'artistic' ? 'rotate(-2deg)' : 'none',
}));

const SectionTitle = styled(Typography)<StyledProps>(({ colors }) => ({
  fontSize: '18px',
  fontWeight: 'bold',
  color: colors?.primary || '#ff6b6b',
  marginBottom: '20px',
  position: 'relative',
  paddingLeft: '20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '100%',
    background: `linear-gradient(to bottom, ${colors?.primary || '#ff6b6b'}, ${
      colors?.secondary || '#4ecdc4'
    })`,
    borderRadius: '2px',
  },
}));

const InfoCard = styled(Box)<StyledProps>(({ colors }) => ({
  padding: '25px',
  backgroundColor: '#fafafa',
  borderRadius: '15px',
  border: `2px solid ${colors?.primary || '#ff6b6b'}20`,
  position: 'relative',
  marginBottom: '20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: `linear-gradient(135deg, ${colors?.primary || '#ff6b6b'}, ${
      colors?.secondary || '#4ecdc4'
    })`,
    borderRadius: '15px',
    zIndex: -1,
    opacity: 0.1,
  },
}));

const StyledTable = styled(Table)<StyledProps>(({ colors }) => ({
  '& .MuiTableHead-root': {
    background: `linear-gradient(135deg, ${colors?.primary || '#ff6b6b'} 0%, ${
      colors?.secondary || '#4ecdc4'
    } 100%)`,
    '& .MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root': {
      '&:nth-of-type(even)': {
        backgroundColor: `${colors?.primary || '#ff6b6b'}05`,
      },
      '&:hover': {
        backgroundColor: `${colors?.primary || '#ff6b6b'}10`,
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease',
      },
    },
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${colors?.primary || '#ff6b6b'}20`,
      fontSize: '13px',
    },
  },
}));

const TotalSection = styled(Box)<StyledProps>(({ colors }) => ({
  marginTop: '40px',
  padding: '30px',
  background: `linear-gradient(135deg, ${colors?.primary || '#ff6b6b'}10 0%, ${
    colors?.secondary || '#4ecdc4'
  }10 100%)`,
  borderRadius: '20px',
  border: `3px solid ${colors?.primary || '#ff6b6b'}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '50px',
    height: '50px',
    background: `linear-gradient(135deg, ${colors?.secondary || '#4ecdc4'}, ${
      colors?.primary || '#ff6b6b'
    })`,
    borderRadius: '50%',
    opacity: 0.2,
  },
}));

const Footer = styled(Box)<CustomSettingsProps>(
  ({ colors, customSettings }) => ({
    marginTop: '50px',
    padding: `${
      customSettings?.footerHeight ? customSettings.footerHeight / 2 : 30
    }px 0`,
    borderTop: `3px solid ${colors?.primary || '#ff6b6b'}`,
    textAlign: 'center',
    color: '#666',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-3px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '6px',
      background: `linear-gradient(to right, ${colors?.primary || '#ff6b6b'}, ${
        colors?.secondary || '#4ecdc4'
      })`,
      borderRadius: '3px',
    },
  }),
);

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
  invoiceData,
  templateConfig = {},
  layout = 'creative',
  colors = { primary: '#ff6b6b', secondary: '#4ecdc4' },
  logo,
  customSettings = {},
}) => {
  const {
    invoiceNumber = 'CRE-001',
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
    <InfoCard colors={colors}>
      <SectionTitle colors={colors}>{title}</SectionTitle>
      <Typography
        variant='h6'
        sx={{ fontWeight: 'bold', mb: 2, color: '#2c2c2c' }}
      >
        {company.name || 'Nazwa firmy'}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, color: '#555' }}>
        {company.address || 'Adres'}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, color: '#555' }}>
        {company.city || 'Miasto'}
      </Typography>
      <Typography variant='body2' sx={{ mb: 1, fontWeight: 'bold' }}>
        NIP: {company.nip || 'NIP'}
      </Typography>
      {company.phone && (
        <Typography variant='body2' sx={{ color: '#555' }}>
          Tel: {company.phone}
        </Typography>
      )}
      {company.email && (
        <Typography variant='body2' sx={{ color: '#555' }}>
          Email: {company.email}
        </Typography>
      )}
    </InfoCard>
  );

  const renderInvoiceDetails = () => (
    <InfoCard colors={colors}>
      <SectionTitle colors={colors}>Szczegóły faktury</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1 }}>
            Numer faktury:
          </Typography>
          <Typography
            variant='h5'
            sx={{ color: colors.primary, fontWeight: 'bold', mb: 2 }}
          >
            {invoiceNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1 }}>
            Data wystawienia:
          </Typography>
          <Typography variant='body1' sx={{ mb: 2 }}>
            {issueDate}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1 }}>
            Termin płatności:
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: '#d32f2f', fontWeight: 'bold' }}
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
            <TableCell>Nazwa towaru/usługi</TableCell>
            <TableCell align='center'>Ilość</TableCell>
            <TableCell align='right'>Cena netto</TableCell>
            <TableCell align='center'>VAT %</TableCell>
            <TableCell align='right'>Wartość netto</TableCell>
            <TableCell align='right'>Wartość brutto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell sx={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
              <TableCell sx={{ fontWeight: '500' }}>{item.name}</TableCell>
              <TableCell align='center'>
                {item.quantity} {item.unit}
              </TableCell>
              <TableCell align='right'>
                {(item.netPrice || 0).toFixed(2)} PLN
              </TableCell>
              <TableCell align='center'>{(item.vat || 0) * 100}%</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                {(item.netValue || 0).toFixed(2)} PLN
              </TableCell>
              <TableCell
                align='right'
                sx={{ fontWeight: 'bold', color: colors?.primary }}
              >
                {(item.grossValue || 0).toFixed(2)} PLN
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
        <Grid item xs={12} md={6}>
          {paymentTerms && (
            <Box>
              <Typography
                variant='h6'
                sx={{ fontWeight: 'bold', mb: 2, color: colors?.primary }}
              >
                Warunki płatności:
              </Typography>
              <Typography variant='body1' sx={{ color: '#555' }}>
                {paymentTerms}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='h6' sx={{ mb: 2, color: '#666' }}>
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
      <Header colors={colors} layout={layout} customSettings={customSettings}>
        <Box>
          {logo && <Logo src={logo.url} alt='Logo firmy' />}
          <InvoiceTitle colors={colors} layout={layout}>
            FAKTURA
          </InvoiceTitle>
        </Box>
        {layout !== 'artistic' && (
          <Box sx={{ textAlign: 'right' }}>
            <Typography
              variant='h5'
              sx={{
                color: layout === 'gradient' ? 'white' : colors?.primary,
                fontWeight: 'bold',
              }}
            >
              {invoiceNumber}
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: layout === 'gradient' ? 'rgba(255,255,255,0.9)' : '#666',
              }}
            >
              {issueDate}
            </Typography>
          </Box>
        )}
      </Header>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={layout === 'artistic' ? 12 : 6}>
          {renderCompanyInfo(seller, 'Dane sprzedawcy')}
        </Grid>
        <Grid item xs={12} md={layout === 'artistic' ? 12 : 6}>
          {renderCompanyInfo(buyer, 'Dane nabywcy')}
        </Grid>
      </Grid>

      {layout === 'artistic' && renderInvoiceDetails()}
      {renderItemsTable()}
      {renderTotals()}

      {notes && (
        <Box sx={{ mt: 4 }}>
          <SectionTitle colors={colors}>Uwagi dodatkowe</SectionTitle>
          <InfoCard colors={colors}>
            <Typography variant='body1' sx={{ color: '#555' }}>
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

export default CreativeTemplate;
