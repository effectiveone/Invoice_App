import React, { useEffect } from 'react';
import Layout from '../shared/ui/Layout/layout';
import { useProduct } from '../shared/lib/useProduct';
import { InventoryTable } from '../features/inventory';

const EnhancedInventoryPage: React.FC = () => {
  const { productList, loadProducts } = useProduct();

  // Załadowanie danych produktów przy pierwszym renderze
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return <InventoryTable products={productList || []} />;
};

export default Layout(EnhancedInventoryPage);
