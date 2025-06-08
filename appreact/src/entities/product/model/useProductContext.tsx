import { createContext, useContext, ReactNode } from 'react';
import { useProduct } from '../../../shared/lib/useProduct';

interface ProductContextType {
  [key: string]: any;
}

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const product = useProduct();

  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
