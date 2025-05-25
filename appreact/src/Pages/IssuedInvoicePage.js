import React from 'react';
import Layout from '../Shared/Components/Layout/layout';
import { InvoiceProvider } from '../Shared/Context/useInvoiceContext';
import InvoiceIssuedContent from '../Shared/Components/AllInvoices/InvoiceIssuedContent';

const IssuedInvoicePage = () => {
  return (
    <InvoiceProvider>
      <InvoiceIssuedContent />
    </InvoiceProvider>
  );
};

export default Layout(IssuedInvoicePage);
