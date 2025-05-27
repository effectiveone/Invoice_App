import Layout from "../shared/ui/Layout/layout";

import { InvoiceProvider } from "../entities/invoice/model/useInvoiceContext";
import NewInvoice from "../features/invoice/ui/NewInvoice/NewInvoice";

export const NewInvoicePage = () => {
  return (
    <InvoiceProvider>
      <NewInvoice />
    </InvoiceProvider>
  );
};

export default Layout(NewInvoicePage);
