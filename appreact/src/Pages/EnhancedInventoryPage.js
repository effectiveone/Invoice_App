import React, { useEffect } from 'react';
import Layout from '../shared/ui/Layout/layout';
import { useProduct } from '../shared/lib/useProduct';
import { InventoryTable } from '../features/inventory';

const EnhancedInventoryPage = () => {
  const { productList, loadProducts } = useProduct();

  // Załadowanie danych produktów przy pierwszym renderze
  useEffect(() => {
    loadProducts();
  }, []);

  return <InventoryTable products={productList || []} />;
};

export default Layout(EnhancedInventoryPage);
