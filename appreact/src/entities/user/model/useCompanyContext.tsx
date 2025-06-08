import { createContext, useContext, ReactNode } from 'react';
import { useCompany } from '../../../shared/lib/useCompany';

interface CompanyContextType {
  [key: string]: any;
}

interface CompanyProviderProps {
  children: ReactNode;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompanyContext must be used within a CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }: CompanyProviderProps) => {
  const company = useCompany();

  return (
    <CompanyContext.Provider value={company}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
