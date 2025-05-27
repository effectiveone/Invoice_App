import { createContext, useContext } from "react";
import { useProduct } from "../../../shared/lib/useProduct";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const Product = useProduct();

  return (
    <ProductContext.Provider value={Product}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
