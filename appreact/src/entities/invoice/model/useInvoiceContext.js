import { createContext, useContext } from 'react';
import { useInvoice } from '../../../shared/lib/useInvoice';

const InvoiceContext = createContext();

export const useInvoiceContext = () => useContext(InvoiceContext);

export const InvoiceProvider = ({ children }) => {
  const invoice = useInvoice();

  return (
    <InvoiceContext.Provider value={invoice}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
