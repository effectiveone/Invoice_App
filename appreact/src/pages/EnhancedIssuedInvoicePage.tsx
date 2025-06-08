import React from 'react';
import Layout from '../shared/ui/Layout/layout';
import { InvoiceProvider } from '../entities/invoice/model/useInvoiceContext';
import { EnhancedInvoicesTable } from '../shared/ui/DataTable';
import { useInvoiceContext } from '../entities/invoice/model/useInvoiceContext';

// Component that uses the invoice context
const InvoicesTableWithContext = () => {
  const { invoiceDate } = useInvoiceContext();

  return <EnhancedInvoicesTable invoices={invoiceDate || []} />;
};

const EnhancedIssuedInvoicePage = () => {
  return (
    <InvoiceProvider>
      <InvoicesTableWithContext />
    </InvoiceProvider>
  );
};

export default Layout(EnhancedIssuedInvoicePage);
