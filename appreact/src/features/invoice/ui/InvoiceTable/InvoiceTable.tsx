import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';
import { t } from 'i18next';
import DataTableProvider from '../../../../shared/ui/DataTable/DataTableProvider';

// Utility functions for formatting
const formatCurrency = (value: any) => {
  if (!value) return '0.00 zł';
  return `${Number(value).toFixed(2)} zł`;
};

const formatDate = (value: any) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('pl-PL');
};

const useStyles = makeStyles((theme) => ({
  invoiceNumberCell: {
    fontFamily: 'monospace',
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: '0.875rem',
  },
  statusChip: {
    borderRadius: theme.spacing(1),
    fontWeight: 500,
    fontSize: '0.75rem',
    height: 24,
  },
  customerCell: {
    fontWeight: 500,
    '& .company-name': {
      color: theme.palette.text.primary,
    },
    '& .legal-form': {
      color: theme.palette.text.secondary,
      fontSize: '0.75rem',
    },
  },
  amountCell: {
    fontWeight: 600,
    textAlign: 'right',
  },
  dateCell: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}));

/**
 * Advanced InvoiceTable component using Render Props pattern
 * Demonstrates enterprise-level React patterns for invoice management
 */
const InvoiceTable = ({
  invoices = [],
  loading = false,
  error = null,
  onEdit,
  onDelete,
  onView,
  onAdd,
  title,
  subtitle,
  searchPlaceholder,
  children,
  dense = false,
  showActions = true,
  variant = 'standard', // 'standard' | 'summary' | 'detailed'
  showStatus = false,
  ...tableProps
}) => {
  const classes = useStyles();

  // Calculate invoice status (example business logic)
  const getInvoiceStatus = (invoice) => {
    const today = new Date();
    const paymentDate = new Date(invoice.invoicePaymentDate);

    if (paymentDate < today) {
      return { label: 'Overdue', color: 'secondary' };
    } else if (
      paymentDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    ) {
      return { label: 'Due Soon', color: 'primary' };
    }
    return { label: 'Current', color: 'default' };
  };

  // Dynamic column configuration based on variant
  const columns = useMemo(() => {
    const baseColumns = [
      {
        key: 'invoiceNumber',
        label: t('invoiceNumber'),
        sortable: true,
        filterable: true,
        width: variant === 'summary' ? '20%' : '15%',
        render: (value: any) => (
          <span className={classes.invoiceNumberCell}>{value}</span>
        ),
      },
      {
        key: 'invoiceSaleDate',
        label: t('invoiceIssueDate'),
        sortable: true,
        width: '12%',
        render: (value: any) => (
          <span className={classes.dateCell}>{formatDate(value)}</span>
        ),
      },
      {
        key: 'selectedKontrahent',
        label: t('invoiceCustomer'),
        sortable: true,
        filterable: true,
        width: '25%',
        render: (value: any) => (
          <div className={classes.customerCell}>
            <div className='company-name'>{value?.companyName}</div>
            <div className='legal-form'>{value?.legalForm}</div>
          </div>
        ),
      },
      {
        key: 'totalNetValue',
        label: t('invoiceNetAmount'),
        sortable: true,
        width: '12%',
        render: (value: any) => (
          <span className={classes.amountCell}>{formatCurrency(value)}</span>
        ),
      },
      {
        key: 'totalGrossValue',
        label: t('invoiceGrossAmount'),
        sortable: true,
        width: '12%',
        render: (value: any) => (
          <span className={classes.amountCell}>{formatCurrency(value)}</span>
        ),
      },
    ];

    // Add status column if enabled
    if (showStatus) {
      baseColumns.splice(-2, 0, {
        key: 'status',
        label: 'Status',
        sortable: false,
        width: '10%',
        render: (value: any) => {
          const status = getInvoiceStatus({ status: value });
          return (
            <Chip
              label={status.label}
              size='small'
              color={status.color as any}
              className={classes.statusChip}
            />
          );
        },
      });
    }

    // Add additional columns for detailed variant
    if (variant === 'detailed') {
      baseColumns.splice(-2, 0, {
        key: 'invoicePaymentDate',
        label: t('invoicePaymentDate'),
        sortable: true,
        width: '12%',
        render: (value: any) => (
          <span className={classes.dateCell}>{formatDate(value)}</span>
        ),
      });
    }

    return baseColumns;
  }, [classes, variant, showStatus]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalNet = invoices.reduce(
      (sum, invoice) => sum + (invoice.totalNetValue || 0),
      0,
    );
    const totalGross = invoices.reduce(
      (sum, invoice) => sum + (invoice.totalGrossValue || 0),
      0,
    );
    const overdueCount = invoices.filter((invoice) => {
      const today = new Date();
      const paymentDate = new Date(invoice.invoicePaymentDate);
      return paymentDate < today;
    }).length;

    return {
      totalNet,
      totalGross,
      overdueCount,
      count: invoices.length,
    };
  }, [invoices]);

  // Enhanced render props data
  const renderPropsData = {
    data: invoices,
    columns,
    title: title || t('invoiceManagementTitle'),
    icon: null,
    onAdd,
    onEdit,
    onDelete,
    onView,
    onExport: null,
    actions: showActions ? ['view', 'edit', 'delete'] : [],
    ...tableProps,
  };

  return (
    <DataTableProvider {...renderPropsData}>
      {(dataProps: any) => {
        // Render Props pattern - maximum flexibility
        if (typeof children === 'function') {
          return children({
            ...dataProps,
            // Additional invoice-specific utilities
            invoices,
            summaryStats,
            hasInvoices: invoices.length > 0,
            isEmpty: invoices.length === 0,

            // Business logic utilities
            getInvoiceStatus,

            // Advanced composition methods
            renderSummaryTable: () =>
              dataProps.renderTable({
                variant: 'summary',
                dense: true,
              }),
            renderDetailedTable: () =>
              dataProps.renderTable({
                variant: 'detailed',
                dense: false,
              }),

            // Statistics rendering
            renderSummaryStats: () => (
              <Box mb={2} display='flex' gap={2}>
                <Chip
                  label={`Total: ${formatCurrency(summaryStats.totalGross)}`}
                  color='primary'
                />
                <Chip
                  label={`${summaryStats.count} invoices`}
                  color='default'
                />
                {summaryStats.overdueCount > 0 && (
                  <Chip
                    label={`${summaryStats.overdueCount} overdue`}
                    color='secondary'
                  />
                )}
              </Box>
            ),

            // Context-aware rendering
            renderWithVariant: (selectedVariant) =>
              dataProps.renderTable({ variant: selectedVariant }),
          });
        }

        // Default rendering when no render prop provided
        return dataProps.renderTable();
      }}
    </DataTableProvider>
  );
};

InvoiceTable.propTypes = {
  invoices: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  onAdd: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  children: PropTypes.func,
  dense: PropTypes.bool,
  showActions: PropTypes.bool,
  variant: PropTypes.oneOf(['standard', 'summary', 'detailed']),
  showStatus: PropTypes.bool,
};

export default InvoiceTable;
