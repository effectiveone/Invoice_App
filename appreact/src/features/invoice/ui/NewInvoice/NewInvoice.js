import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import Layout from '../../../../shared/ui/Layout/layout';
import InvoiceForm from './InvoiceForm';
import {
  InvoiceProvider,
  useInvoiceContext,
} from '../../../../entities/invoice/model/useInvoiceContext';
import { ProductProvider } from '../../../../entities/product/model/useProductContext';
import { KontrahentProvider } from '../../../../entities/kontrahent/model/useKontrahentContext';
import { CompanyProvider } from '../../../../entities/user/model/useCompanyContext';
import { Paper, Typography, Container, Fab } from '@mui/material';
import { styled } from '@mui/system';
import { Preview, Print, Save, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import FactoryInvoicePrinter from '../InvoicesTemplates/factoryInvoicePrinter';
import ReactToPrint from 'react-to-print';

const ActionBar = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  zIndex: 1000,
  padding: '16px',
  borderRadius: '16px',
  display: 'flex',
  gap: '12px',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const StyledFab = styled(Fab)(({ variant }) => ({
  background:
    variant === 'preview'
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : variant === 'print'
      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  color: 'white',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  },
  transition: 'all 0.3s ease',
}));

const PreviewContainer = styled(Box)(({ theme }) => ({
  background: '#f8fafc',
  minHeight: '100vh',
  padding: '24px',
}));

const NewInvoice = () => {
  const { t } = useTranslation();
  const { componentRef, handleSubmit } = useInvoiceContext();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      {!isVisible ? (
        <>
          <InvoiceForm />
          <ActionBar>
            <StyledFab
              variant='preview'
              onClick={toggleVisibility}
              size='medium'
            >
              <Preview />
            </StyledFab>
            <StyledFab variant='save' onClick={handleSubmit} size='medium'>
              <Save />
            </StyledFab>
          </ActionBar>
        </>
      ) : (
        <PreviewContainer>
          <Container maxWidth='lg'>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={3}
            >
              <Typography
                variant='h4'
                sx={{ fontWeight: 'bold', color: '#374151' }}
              >
                {t('invoicePreviewTitle')}
              </Typography>
              <Box display='flex' gap={2}>
                <ReactToPrint
                  trigger={() => (
                    <StyledFab variant='print' size='medium'>
                      <Print />
                    </StyledFab>
                  )}
                  content={() => componentRef.current}
                />
                <StyledFab
                  variant='preview'
                  onClick={toggleVisibility}
                  size='medium'
                >
                  <VisibilityOff />
                </StyledFab>
              </Box>
            </Box>
            <Paper
              sx={{
                p: 4,
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              }}
            >
              <FactoryInvoicePrinter />
            </Paper>
          </Container>
        </PreviewContainer>
      )}
    </>
  );
};

export default NewInvoice;
