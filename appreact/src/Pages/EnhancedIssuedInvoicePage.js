import React from 'react';
import Layout from '../Shared/Components/Layout/layout';
import { InvoiceProvider } from '../Shared/Context/useInvoiceContext';
import { EnhancedInvoicesTable } from '../Shared/Components/DataTable';
import { useInvoiceContext } from '../Shared/Context/useInvoiceContext';

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
