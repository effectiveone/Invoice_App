import React from 'react';
import { useInvoiceContext } from '../../../entities/invoice/model/useInvoiceContext';
import { useModal } from '../../../../shared/lib/useModal';
import { useInvoiceTable } from '../../../../shared/lib/useInvoiceTable';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import InvoiceForm from '../NewInvoice/InvoiceForm';
import FilterWrapper from '../FilterWrapper';
import { InvoiceComponent } from './invoiceComponent';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  headerSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    padding: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    color: 'white',
  },
  styledTableContainer: {
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    overflow: 'hidden',
  },
  styledTableHead: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  },
  styledTableCell: {
    fontWeight: '600',
    color: '#374151',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px',
  },
  styledTableRow: {
    '&:hover': {
      background: 'rgba(102, 126, 234, 0.05)',
    },
    '&:nth-of-type(even)': {
      background: 'rgba(248, 250, 252, 0.5)',
    },
  },
  modalContent: {
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
  },
  styledButton: {
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
  },
}));

const InvoiceIssuedContent = () => {
  const classes = useStyles();
  const { open, handleOpen, handleClose } = useModal();
  const { invoiceDate, handleEditInvoice, setLocalInvoiceNumber } =
    useInvoiceContext();
  const { t } = useTranslation();

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
      <Box className={classes.headerSection}>
        <Box>
          <Typography
            variant='h4'
            style={{ fontWeight: 'bold', marginBottom: 8 }}
          >
            📋 {t('invoicesList') || 'Lista faktur'}
          </Typography>
          <Typography variant='body1' style={{ opacity: 0.9 }}>
            {t('manageInvoices') ||
              'Przeglądaj i zarządzaj wszystkimi fakturami'}
          </Typography>
        </Box>
      </Box>

      <Box style={{ marginBottom: 24 }}>
        <FilterWrapper handleFilterChange={handleFilterChange} />
      </Box>

      <TableContainer
        component={Paper}
        className={classes.styledTableContainer}
      >
        <Table aria-label='invoices table'>
          <TableHead className={classes.styledTableHead}>
            <TableRow>
              <TableCell className={classes.styledTableCell}>
                <TableSortLabel
                  active={orderBy === 'number'}
                  direction={order}
                  onClick={() => handleSortRequest('number')}
                >
                  {t('numberInvoice') || 'Numer faktury'}
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.styledTableCell}>
                <TableSortLabel
                  active={orderBy === 'issueDate'}
                  direction={order}
                  onClick={() => handleSortRequest('issueDate')}
                >
                  {t('issueDate') || 'Data wystawienia'}
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.styledTableCell}>
                <TableSortLabel
                  active={orderBy === 'customer'}
                  direction={order}
                  onClick={() => handleSortRequest('customer')}
                >
                  {t('customer') || 'Klient'}
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.styledTableCell}>
                <TableSortLabel
                  active={orderBy === 'netAmount'}
                  direction={order}
                  onClick={() => handleSortRequest('netAmount')}
                >
                  {t('netAmount') || 'Kwota netto'}
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.styledTableCell}>
                <TableSortLabel
                  active={orderBy === 'grossAmount'}
                  direction={order}
                  onClick={() => handleSortRequest('grossAmount')}
                >
                  {t('grossAmount') || 'Kwota brutto'}
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' className={classes.styledTableCell}>
                {t('actions') || 'Akcje'}
              </TableCell>
            </TableRow>
          </TableHead>
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
                <TableRow key={index} className={classes.styledTableRow}>
                  <InvoiceComponent
                    {...invoice}
                    handleOpen={handleOpen}
                    changeInvoiceNumber={changeInvoiceNumber}
                  />
                </TableRow>
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
            style={{ borderTop: '1px solid #e5e7eb' }}
          />
        )}
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Card className={classes.modalContent}>
          <Typography
            variant='h5'
            style={{ marginBottom: 24, fontWeight: 'bold', color: '#374151' }}
          >
            {t('editInvoice') || 'Edytuj fakturę'}
          </Typography>
          <InvoiceForm />
          <Box
            style={{
              marginTop: 24,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 16,
            }}
          >
            <Button
              variant='outlined'
              onClick={handleClose}
              style={{ borderRadius: '12px', textTransform: 'none' }}
            >
              {t('cancel') || 'Anuluj'}
            </Button>
            <Button
              variant='contained'
              onClick={handleEditInvoice}
              className={classes.styledButton}
            >
              {t('saveChanges') || 'Zapisz zmiany'}
            </Button>
          </Box>
        </Card>
      </Modal>
    </Container>
  );
};

export default InvoiceIssuedContent;
