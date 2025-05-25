import React from 'react';
import { useModal } from '../../Hook/useModal';
import { useInvoiceContext } from '../../Context/useInvoiceContext';
import { useInvoiceTable } from '../../Hook/useInvoiceTable';
import { styled } from '@mui/system';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TableSortLabel,
  TablePagination,
  Container,
  Box,
  Typography,
  Card,
} from '@mui/material';
import { List as ListIcon } from '@mui/icons-material';
import InvoiceForm from '../NewInvoice/InvoiceForm';
import FilterWrapper from '../FilterWrapper';
import { InvoiceComponent } from './invoiceComponent';
import { t } from 'i18next';

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
  padding: '24px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '16px',
  color: 'white',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  overflow: 'hidden',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '600',
  color: '#374151',
  borderBottom: '1px solid #e5e7eb',
  padding: '16px',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.05)',
  },
  '&:nth-of-type(even)': {
    background: 'rgba(248, 250, 252, 0.5)',
  },
}));

const ModalContent = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1200px',
  maxHeight: '90vh',
  overflow: 'auto',
  borderRadius: '16px',
  padding: '24px',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '12px',
  padding: '12px 32px',
  fontWeight: '600',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  },
}));

const InvoicesIssuedList = () => {
  const { open, handleOpen, handleClose } = useModal();
  const { invoiceDate, handleEditInvoice, setLocalInvoiceNumber } =
    useInvoiceContext();
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleChangePage,
    handleSortRequest,
    handleChangeRowsPerPage,
    handleFilterChange,
    sortedInvoices,
  } = useInvoiceTable({ invoiceDate: invoiceDate });

  const changeInvoiceNumber = (inv) => {
    setLocalInvoiceNumber(inv);
  };

  return (
    <Container maxWidth='xl'>
      <HeaderSection>
        <ListIcon sx={{ fontSize: 32, marginRight: 2 }} />
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            Lista faktur
          </Typography>
          <Typography variant='body1' sx={{ opacity: 0.9 }}>
            Przeglądaj i zarządzaj wszystkimi fakturami
          </Typography>
        </Box>
      </HeaderSection>

      <Box sx={{ mb: 3 }}>
        <FilterWrapper handleFilterChange={handleFilterChange} />
      </Box>

      <StyledTableContainer component={Paper}>
        <Table aria-label='invoices table'>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'number'}
                  direction={order}
                  onClick={() => handleSortRequest('number')}
                >
                  {t('numberInvoice')}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'issueDate'}
                  direction={order}
                  onClick={() => handleSortRequest('issueDate')}
                >
                  {t('issueDate')}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'customer'}
                  direction={order}
                  onClick={() => handleSortRequest('customer')}
                >
                  {t('customer')}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'netAmount'}
                  direction={order}
                  onClick={() => handleSortRequest('netAmount')}
                >
                  {t('netAmount')}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'grossAmount'}
                  direction={order}
                  onClick={() => handleSortRequest('grossAmount')}
                >
                  {t('grossAmount')}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align='center'>Akcje</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {sortedInvoices &&
              Array.isArray(sortedInvoices) &&
              (rowsPerPage > 0
                ? sortedInvoices.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : sortedInvoices
              )?.map((invoice, index) => (
                <StyledTableRow key={index}>
                  <InvoiceComponent
                    {...invoice}
                    handleOpen={handleOpen}
                    changeInvoiceNumber={changeInvoiceNumber}
                  />
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {sortedInvoices.length > 10 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component='div'
            count={sortedInvoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: '1px solid #e5e7eb' }}
          />
        )}
      </StyledTableContainer>

      <Modal open={open} onClose={handleClose}>
        <ModalContent>
          <Typography
            variant='h5'
            sx={{ mb: 3, fontWeight: 'bold', color: '#374151' }}
          >
            Edytuj fakturę
          </Typography>
          <InvoiceForm />
          <Box
            sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <Button
              variant='outlined'
              onClick={handleClose}
              sx={{ borderRadius: '12px', textTransform: 'none' }}
            >
              Anuluj
            </Button>
            <StyledButton variant='contained' onClick={handleEditInvoice}>
              {t('saveChanges')}
            </StyledButton>
          </Box>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default InvoicesIssuedList;
