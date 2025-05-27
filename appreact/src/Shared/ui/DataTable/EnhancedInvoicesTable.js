import React, { useState } from 'react';
import {
  Typography,
  Chip,
  Box,
  Modal,
  Card,
  Button,
  Stack,
} from '@mui/material';
import {
  Receipt as ReceiptIcon,
  PictureAsPdf as PdfIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import DataTableProvider from './DataTableProvider';
import InvoiceForm from '../../../features/invoice/ui/NewInvoice/InvoiceForm';
import { useInvoiceContext } from '../../../entities/invoice/model/useInvoiceContext';
import { useModal } from '../../lib/useModal';

// Styled Modal Content
const ModalContent = ({ children, onClose, title }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        overflow: 'auto',
        borderRadius: '16px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant='h5' sx={{ mb: 3, fontWeight: 'bold' }}>
        {title}
      </Typography>
      {children}
      <Stack
        direction='row'
        spacing={2}
        sx={{ mt: 3, justifyContent: 'flex-end' }}
      >
        <Button variant='outlined' onClick={onClose}>
          {t('cancel')}
        </Button>
      </Stack>
    </Box>
  );
};

// Domain Model for Invoice Status
const InvoiceStatus = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
};

const getStatusColor = (status) => {
  switch (status) {
    case InvoiceStatus.DRAFT:
      return 'default';
    case InvoiceStatus.SENT:
      return 'info';
    case InvoiceStatus.PAID:
      return 'success';
    case InvoiceStatus.OVERDUE:
      return 'error';
    case InvoiceStatus.CANCELLED:
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusLabel = (status, t) => {
  switch (status) {
    case InvoiceStatus.DRAFT:
      return t('statusDraft');
    case InvoiceStatus.SENT:
      return t('statusSent');
    case InvoiceStatus.PAID:
      return t('statusPaid');
    case InvoiceStatus.OVERDUE:
      return t('statusOverdue');
    case InvoiceStatus.CANCELLED:
      return t('statusCancelled');
    default:
      return t('statusUnknown');
  }
};

// Enhanced Invoice Table Component
const EnhancedInvoicesTable = ({ invoices = [] }) => {
  const { t } = useTranslation();
  const { open, handleOpen, handleClose } = useModal();
  const { handleEditInvoice: handleEditInvoiceContext, setLocalInvoiceNumber } =
    useInvoiceContext();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [actionType, setActionType] = useState(null);

  // Define table columns with enhanced functionality
  const columns = [
    {
      key: 'invoiceNumber',
      label: t('invoiceNumber'),
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <Box>
          <Typography variant='body2' fontWeight='600'>
            {value}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            ID: {row.id}
          </Typography>
        </Box>
      ),
    },
    {
      key: 'invoiceSaleDate',
      label: t('issueDate'),
      sortable: true,
      filterable: true,
      render: (value) =>
        value ? format(new Date(value), 'dd MMM yyyy', { locale: pl }) : '-',
    },
    {
      key: 'selectedKontrahent.companyName',
      label: t('customer'),
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <Box>
          <Typography variant='body2' fontWeight='500'>
            {value || t('noData')}
          </Typography>
          {row.selectedKontrahent?.nip && (
            <Typography variant='caption' color='text.secondary'>
              NIP: {row.selectedKontrahent.nip}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      key: 'totalNetValue',
      label: t('netAmount'),
      sortable: true,
      filterable: false,
      render: (value) => (
        <Typography variant='body2' fontWeight='600'>
          {value ? `${Number(value).toFixed(2)} zł` : '0.00 zł'}
        </Typography>
      ),
    },
    {
      key: 'totalGrossValue',
      label: t('grossAmount'),
      sortable: true,
      filterable: false,
      render: (value) => (
        <Typography variant='body2' fontWeight='600' color='primary.main'>
          {value ? `${Number(value).toFixed(2)} zł` : '0.00 zł'}
        </Typography>
      ),
    },
    {
      key: 'status',
      label: t('invoiceStatus'),
      sortable: true,
      filterable: true,
      render: (value) => (
        <Chip
          label={getStatusLabel(value || InvoiceStatus.DRAFT, t)}
          color={getStatusColor(value || InvoiceStatus.DRAFT)}
          size='small'
          variant='outlined'
        />
      ),
    },
    {
      key: 'dueDate',
      label: t('dueDate'),
      sortable: true,
      filterable: true,
      render: (value) => {
        if (!value) return '-';
        const dueDate = new Date(value);
        const isOverdue = dueDate < new Date() && !value.paid;
        return (
          <Typography
            variant='body2'
            color={isOverdue ? 'error.main' : 'text.primary'}
          >
            {format(dueDate, 'dd MMM yyyy', { locale: pl })}
          </Typography>
        );
      },
    },
  ];

  // Enhanced data processing
  const processedInvoices = invoices.map((invoice) => ({
    ...invoice,
    id: invoice._id || invoice.id || Math.random().toString(36),
    status: invoice.status || InvoiceStatus.DRAFT,
    dueDate:
      invoice.dueDate ||
      calculateDueDate(invoice.invoiceSaleDate, invoice.paymentDays),
  }));

  // Helper function to calculate due date
  function calculateDueDate(issueDate, paymentDays = 30) {
    if (!issueDate) return null;
    const date = new Date(issueDate);
    date.setDate(date.getDate() + paymentDays);
    return date;
  }

  // Event handlers
  const handleAddInvoice = () => {
    setActionType('add');
    setSelectedInvoice(null);
    handleOpen();
  };

  const handleEditInvoice = (invoice) => {
    setActionType('edit');
    setSelectedInvoice(invoice);
    setLocalInvoiceNumber(invoice.invoiceNumber);
    handleOpen();
  };

  const handleViewInvoice = (invoice) => {
    setActionType('view');
    setSelectedInvoice(invoice);
    handleOpen();
  };

  const handleDeleteInvoice = (invoice) => {
    if (
      window.confirm(
        `Czy na pewno chcesz usunąć fakturę ${invoice.invoiceNumber}?`,
      )
    ) {
      // Implement delete logic here
      console.log('Deleting invoice:', invoice);
    }
  };

  const handleExportInvoices = (data) => {
    // Implement export logic here
    console.log('Exporting invoices:', data);
  };

  const handleGeneratePDF = (invoice) => {
    // Implement PDF generation
    console.log('Generating PDF for:', invoice);
  };

  const handleSendEmail = (invoice) => {
    // Implement email sending
    console.log('Sending email for:', invoice);
  };

  // Custom actions with additional buttons
  const customActions = (invoice) => (
    <Stack direction='row' spacing={1}>
      <Button
        size='small'
        startIcon={<PdfIcon />}
        onClick={() => handleGeneratePDF(invoice)}
        variant='outlined'
      >
        PDF
      </Button>
      <Button
        size='small'
        startIcon={<EmailIcon />}
        onClick={() => handleSendEmail(invoice)}
        variant='outlined'
      >
        Wyślij
      </Button>
    </Stack>
  );

  return (
    <>
      <DataTableProvider
        data={processedInvoices}
        columns={columns}
        title='Faktury wystawione'
        icon={<ReceiptIcon />}
        onAdd={handleAddInvoice}
        onEdit={handleEditInvoice}
        onView={handleViewInvoice}
        onDelete={handleDeleteInvoice}
        onExport={handleExportInvoices}
        actions={['view', 'edit', 'delete']}
        initialRowsPerPage={25}
      >
        {(tableState, tableActions) => (
          <DataTableProvider
            data={processedInvoices}
            columns={columns}
            title='Faktury wystawione'
            icon={<ReceiptIcon />}
            onAdd={handleAddInvoice}
            onEdit={handleEditInvoice}
            onView={handleViewInvoice}
            onDelete={handleDeleteInvoice}
            onExport={handleExportInvoices}
            actions={['view', 'edit', 'delete']}
            initialRowsPerPage={25}
          />
        )}
      </DataTableProvider>

      {/* Enhanced Modal */}
      <Modal open={open} onClose={handleClose}>
        <ModalContent
          onClose={handleClose}
          title={
            actionType === 'add'
              ? 'Nowa faktura'
              : actionType === 'edit'
              ? `Edytuj fakturę ${selectedInvoice?.invoiceNumber}`
              : `Faktura ${selectedInvoice?.invoiceNumber}`
          }
        >
          {actionType === 'view' && selectedInvoice ? (
            <Box>
              <Typography variant='h6' gutterBottom>
                Szczegóły faktury
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Kontrahent
                  </Typography>
                  <Typography variant='body1'>
                    {selectedInvoice.selectedKontrahent?.companyName ||
                      'Brak danych'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Wartość netto / brutto
                  </Typography>
                  <Typography variant='body1'>
                    {selectedInvoice.totalNetValue} zł /{' '}
                    {selectedInvoice.totalGrossValue} zł
                  </Typography>
                </Box>

                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Status
                  </Typography>
                  <Chip
                    label={getStatusLabel(selectedInvoice.status, t)}
                    color={getStatusColor(selectedInvoice.status)}
                    size='small'
                  />
                </Box>

                {customActions(selectedInvoice)}
              </Stack>
            </Box>
          ) : (
            <InvoiceForm />
          )}

          {actionType !== 'view' && (
            <Stack
              direction='row'
              spacing={2}
              sx={{ mt: 3, justifyContent: 'flex-end' }}
            >
              <Button
                variant='contained'
                onClick={() => {
                  if (actionType === 'edit') {
                    handleEditInvoiceContext();
                  }
                  handleClose();
                }}
              >
                {actionType === 'add' ? 'Utwórz fakturę' : 'Zapisz zmiany'}
              </Button>
            </Stack>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnhancedInvoicesTable;
