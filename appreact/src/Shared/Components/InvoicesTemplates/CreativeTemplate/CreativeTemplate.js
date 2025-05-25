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
    padding: `${customSettings?.marginTop || 15}mm ${
      customSettings?.marginRight || 15
    }mm ${customSettings?.marginBottom || 15}mm ${
      customSettings?.marginLeft || 15
    }mm`,
    backgroundColor: 'white',
    fontFamily: customSettings?.fontFamily || 'Roboto, sans-serif',
    fontSize: `${customSettings?.fontSize || 12}px`,
    lineHeight: 1.6,
    color: '#333',
    position: 'relative',
    overflow: 'hidden',
    '&::before':
      layout === 'asymmetric'
        ? {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${
              colors?.primary || '#667eea'
            }20, transparent 70%)`,
            zIndex: 0,
          }
        : {},
  }),
);

const Header = styled(Box)(({ colors, layout, customSettings }) => ({
  marginBottom: '30px',
  padding: `${
    customSettings?.headerHeight ? customSettings.headerHeight / 4 : 25
  }px`,
  background:
    layout === 'asymmetric'
      ? `linear-gradient(135deg, ${colors?.primary || '#667eea'} 0%, ${
          colors?.secondary || '#764ba2'
        } 50%, transparent 100%)`
      : layout === 'grid'
      ? `repeating-linear-gradient(45deg, ${colors?.primary || '#667eea'}, ${
          colors?.primary || '#667eea'
        } 10px, ${colors?.secondary || '#764ba2'} 10px, ${
          colors?.secondary || '#764ba2'
        } 20px)`
      : `linear-gradient(135deg, ${colors?.primary || '#667eea'} 0%, ${
          colors?.secondary || '#764ba2'
        } 100%)`,
  borderRadius:
    layout === 'grid'
      ? '20px'
      : layout === 'asymmetric'
      ? '0 0 50px 0'
      : '15px',
  color: 'white',
  display: 'flex',
  flexDirection: layout === 'two-column' ? 'row' : 'column',
  justifyContent: 'space-between',
  alignItems: layout === 'two-column' ? 'center' : 'flex-start',
  position: 'relative',
  zIndex: 1,
  clipPath:
    layout === 'asymmetric' ? 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' : 'none',
}));

const Logo = styled('img')({
  maxHeight: '80px',
  maxWidth: '200px',
  objectFit: 'contain',
  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
});

const InvoiceTitle = styled(Typography)(({ colors, layout }) => ({
  fontSize: layout === 'grid' ? '36px' : '32px',
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '10px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  transform: layout === 'asymmetric' ? 'rotate(-2deg)' : 'none',
}));

const SectionTitle = styled(Typography)(({ colors, layout }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  color: colors?.primary || '#667eea',
  marginBottom: '15px',
  position: 'relative',
  paddingLeft: '20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '15px',
    height: '15px',
    background: `linear-gradient(45deg, ${colors?.primary || '#667eea'}, ${
      colors?.secondary || '#764ba2'
    })`,
    borderRadius: layout === 'grid' ? '3px' : '50%',
  },
}));

const CreativeCard = styled(Box)(({ colors, layout }) => ({
  padding: '25px',
  background:
    layout === 'grid'
      ? `linear-gradient(135deg, ${colors?.primary || '#667eea'}05 0%, ${
          colors?.secondary || '#764ba2'
        }05 100%)`
      : `linear-gradient(135deg, white 0%, ${
          colors?.primary || '#667eea'
        }08 100%)`,
  borderRadius: layout === 'grid' ? '15px' : '20px',
  border: `2px solid ${colors?.primary || '#667eea'}30`,
  marginBottom: '20px',
  position: 'relative',
  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
  transform: layout === 'asymmetric' ? 'rotate(0.5deg)' : 'none',
  '&::after':
    layout === 'asymmetric'
      ? {
          content: '""',
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          width: '20px',
          height: '20px',
          background: colors?.secondary || '#764ba2',
          borderRadius: '50%',
        }
      : {},
}));

const StyledTable = styled(Table)(({ colors, layout }) => ({
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  '& .MuiTableHead-root': {
    background: `linear-gradient(135deg, ${colors?.primary || '#667eea'} 0%, ${
      colors?.secondary || '#764ba2'
    } 100%)`,
    '& .MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root:nth-of-type(odd)': {
      backgroundColor: `${colors?.primary || '#667eea'}05`,
    },
    '& .MuiTableRow-root:nth-of-type(even)': {
      backgroundColor: `${colors?.secondary || '#764ba2'}05`,
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: `${colors?.primary || '#667eea'}15`,
      transform: layout === 'asymmetric' ? 'scale(1.02)' : 'none',
      transition: 'all 0.3s ease',
    },
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${colors?.primary || '#667eea'}20`,
    padding: '16px',
  },
}));

const TotalSection = styled(Box)(({ colors, layout }) => ({
  marginTop: '30px',
  padding: '30px',
  background:
    layout === 'grid'
      ? `repeating-conic-gradient(from 0deg, ${
          colors?.primary || '#667eea'
        }10 0deg 30deg, ${colors?.secondary || '#764ba2'}10 30deg 60deg)`
      : `linear-gradient(135deg, ${colors?.primary || '#667eea'}15 0%, ${
          colors?.secondary || '#764ba2'
        }15 100%)`,
  borderRadius: '20px',
  border: `3px solid ${colors?.primary || '#667eea'}40`,
  position: 'relative',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50px',
    height: '20px',
    background: `linear-gradient(135deg, ${colors?.primary || '#667eea'}, ${
      colors?.secondary || '#764ba2'
    })`,
    borderRadius: '0 0 15px 15px',
  },
}));

const Footer = styled(Box)(({ colors, customSettings, layout }) => ({
  marginTop: '40px',
  padding: `${
    customSettings?.footerHeight ? customSettings.footerHeight / 2 : 25
  }px 0`,
  textAlign: 'center',
  color: '#666',
  fontSize: '11px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '3px',
    background: `linear-gradient(90deg, transparent, ${
      colors?.primary || '#667eea'
    }, ${colors?.secondary || '#764ba2'}, transparent)`,
    borderRadius: '3px',
  },
}));

const FloatingShape = styled(Box)(({ colors, layout }) => ({
  position: 'absolute',
  width: '100px',
  height: '100px',
  background: `linear-gradient(45deg, ${colors?.primary || '#667eea'}20, ${
    colors?.secondary || '#764ba2'
  }20)`,
  borderRadius: layout === 'grid' ? '15px' : '50%',
  zIndex: -1,
  opacity: 0.3,
}));

const CreativeTemplate = ({
  invoiceData,
  templateConfig = {},
  layout = 'two-column',
  colors = { primary: '#667eea', secondary: '#764ba2' },
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

  const renderCompanyInfo = (company, title) => (
    <CreativeCard colors={colors} layout={layout}>
      <SectionTitle colors={colors} layout={layout}>
        {title}
      </SectionTitle>
      <Typography
        variant='h5'
        sx={{ fontWeight: 'bold', mb: 2, color: colors?.primary }}
      >
        {company.name || 'Nazwa firmy'}
      </Typography>
      <Typography variant='body1' sx={{ mb: 1, color: '#555' }}>
        📍 {company.address || 'Adres'}
      </Typography>
      <Typography variant='body1' sx={{ mb: 1, color: '#555' }}>
        🏙️ {company.city || 'Miasto'}
      </Typography>
      <Typography
        variant='body1'
        sx={{ mb: 1, fontWeight: 'bold', color: colors?.secondary }}
      >
        🆔 NIP: {company.nip || 'NIP'}
      </Typography>
      {company.phone && (
        <Typography variant='body1' sx={{ color: '#555' }}>
          📞 {company.phone}
        </Typography>
      )}
      {company.email && (
        <Typography variant='body1' sx={{ color: '#555' }}>
          ✉️ {company.email}
        </Typography>
      )}
    </CreativeCard>
  );

  const renderInvoiceDetails = () => (
    <CreativeCard colors={colors} layout={layout}>
      <SectionTitle colors={colors} layout={layout}>
        Szczegóły faktury
      </SectionTitle>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            sx={{ color: colors?.primary, fontWeight: 'bold', mb: 2 }}
          >
            {invoiceNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant='body2'
            sx={{ fontWeight: 'bold', color: colors?.secondary }}
          >
            📅 Data wystawienia:
          </Typography>
          <Typography variant='h6'>{issueDate}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant='body2'
            sx={{ fontWeight: 'bold', color: colors?.secondary }}
          >
            ⏰ Termin płatności:
          </Typography>
          <Typography
            variant='h6'
            sx={{ color: '#e74c3c', fontWeight: 'bold' }}
          >
            {dueDate}
          </Typography>
        </Grid>
      </Grid>
    </CreativeCard>
  );

  const renderItemsTable = () => (
    <Box sx={{ mb: 4 }}>
      <SectionTitle colors={colors} layout={layout}>
        🛍️ Pozycje faktury
      </SectionTitle>
      <StyledTable colors={colors} layout={layout}>
        <TableHead>
          <TableRow>
            <TableCell>Nr</TableCell>
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
              <TableCell sx={{ fontWeight: 'bold', color: colors?.primary }}>
                {index + 1}
              </TableCell>
              <TableCell sx={{ fontWeight: '500' }}>{item.name}</TableCell>
              <TableCell align='center'>
                <Typography
                  variant='body2'
                  sx={{
                    backgroundColor: colors?.primary + '20',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    display: 'inline-block',
                  }}
                >
                  {item.quantity} {item.unit}
                </Typography>
              </TableCell>
              <TableCell align='right'>{item.price?.toFixed(2)} zł</TableCell>
              <TableCell align='center'>
                <Typography
                  variant='body2'
                  sx={{
                    backgroundColor: colors?.secondary + '20',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    display: 'inline-block',
                  }}
                >
                  {item.vat}%
                </Typography>
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                {(item.quantity * item.price)?.toFixed(2)} zł
              </TableCell>
              <TableCell
                align='right'
                sx={{ fontWeight: 'bold', color: colors?.primary }}
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {paymentTerms && (
            <Box>
              <Typography
                variant='h6'
                sx={{ fontWeight: 'bold', mb: 2, color: colors?.primary }}
              >
                💳 Warunki płatności:
              </Typography>
              <Typography variant='body1' sx={{ color: '#555' }}>
                {paymentTerms}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='h6' sx={{ mb: 2, color: colors?.secondary }}>
              💰 Podsumowanie:
            </Typography>
            <Typography variant='body1' sx={{ mb: 1 }}>
              Wartość netto: <strong>{subtotal?.toFixed(2)} zł</strong>
            </Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
              VAT: <strong>{taxAmount?.toFixed(2)} zł</strong>
            </Typography>
            <Divider
              sx={{ my: 2, borderWidth: 2, borderColor: colors?.primary }}
            />
            <Typography
              variant='h3'
              sx={{
                color: colors?.primary,
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {total?.toFixed(2)} zł
            </Typography>
            <Typography variant='caption' sx={{ color: colors?.secondary }}>
              DO ZAPŁATY
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
      {/* Floating decorative shapes */}
      {layout === 'asymmetric' && (
        <>
          <FloatingShape
            colors={colors}
            layout={layout}
            sx={{ top: '20%', right: '5%' }}
          />
          <FloatingShape
            colors={colors}
            layout={layout}
            sx={{ bottom: '30%', left: '5%' }}
          />
        </>
      )}

      <Header colors={colors} layout={layout} customSettings={customSettings}>
        <Box>
          {logo && <Logo src={logo.url} alt='Logo firmy' />}
          <InvoiceTitle colors={colors} layout={layout}>
            ✨ FAKTURA ✨
          </InvoiceTitle>
        </Box>
        {layout === 'two-column' && (
          <Box sx={{ textAlign: 'right' }}>
            <Typography
              variant='h4'
              sx={{ color: 'white', fontWeight: 'bold' }}
            >
              {invoiceNumber}
            </Typography>
            <Typography variant='h6' sx={{ color: 'rgba(255,255,255,0.9)' }}>
              {issueDate}
            </Typography>
          </Box>
        )}
      </Header>

      {layout !== 'two-column' && renderInvoiceDetails()}

      <Grid container spacing={layout === 'grid' ? 2 : 3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          {renderCompanyInfo(seller, '🏢 Sprzedawca')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderCompanyInfo(buyer, '🛒 Nabywca')}
        </Grid>
      </Grid>

      {layout === 'two-column' && renderInvoiceDetails()}
      {renderItemsTable()}
      {renderTotals()}

      {notes && (
        <Box sx={{ mt: 4 }}>
          <SectionTitle colors={colors} layout={layout}>
            📝 Uwagi
          </SectionTitle>
          <CreativeCard colors={colors} layout={layout}>
            <Typography
              variant='body1'
              sx={{ color: '#555', fontStyle: 'italic' }}
            >
              {notes}
            </Typography>
          </CreativeCard>
        </Box>
      )}

      <Footer colors={colors} customSettings={customSettings} layout={layout}>
        <Typography
          variant='caption'
          sx={{ fontWeight: 'bold', color: colors?.primary }}
        >
          🎨 KREATYWNA FAKTURA WYGENEROWANA AUTOMATYCZNIE 🎨
        </Typography>
        <br />
        <Typography variant='caption'>Dziękujemy za współpracę! 💫</Typography>
      </Footer>
    </InvoiceContainer>
  );
};

export default CreativeTemplate;
