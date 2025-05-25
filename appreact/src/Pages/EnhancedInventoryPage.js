import React from 'react';
import Layout from '../Shared/Components/Layout/layout';
import { ProductProvider } from '../Shared/Context/useProductContext';
import { EnhancedInventoryTable } from '../Shared/Components/DataTable';
import { useProductContext } from '../Shared/Context/useProductContext';

// Component that uses the product context
const InventoryTableWithContext = () => {
  const { productList } = useProductContext();

  return <EnhancedInventoryTable products={productList || []} />;
};

const EnhancedInventoryPage = () => {
  return (
    <ProductProvider>
      <InventoryTableWithContext />
    </ProductProvider>
  );
};

export default Layout(EnhancedInventoryPage);
