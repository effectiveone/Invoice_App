import { createContext, useContext, ReactNode } from 'react';
import { useKontrahent } from '../../../shared/lib/useKontrahent';

interface KontrahentContextType {
  [key: string]: any;
}

interface KontrahentProviderProps {
  children: ReactNode;
}

const KontrahentContext = createContext<KontrahentContextType | undefined>(
  undefined,
);

export const useKontrahentContext = () => {
  const context = useContext(KontrahentContext);
  if (context === undefined) {
    throw new Error(
      'useKontrahentContext must be used within a KontrahentProvider',
    );
  }
  return context;
};

export const KontrahentProvider = ({ children }: KontrahentProviderProps) => {
  const kontrahent = useKontrahent();

  return (
    <KontrahentContext.Provider value={kontrahent}>
      {children}
    </KontrahentContext.Provider>
  );
};

export default KontrahentProvider;
