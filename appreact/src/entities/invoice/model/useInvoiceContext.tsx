import { createContext, useContext, ReactNode } from 'react';
import { useInvoice } from '../../../shared/lib/useInvoice';

interface InvoiceContextType {
  [key: string]: any;
}

interface InvoiceProviderProps {
  children: ReactNode;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoiceContext must be used within an InvoiceProvider');
  }
  return context;
};

export const InvoiceProvider = ({ children }: InvoiceProviderProps) => {
  const invoice = useInvoice();

  return (
    <InvoiceContext.Provider value={invoice}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
