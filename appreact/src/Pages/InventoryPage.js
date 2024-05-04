import React from "react";
import Layout from "../Shared/Components/Layout/layout";
import { ProductProvider } from "../Shared/Context/useProductContext";
import Inventory from "../Shared/Components/Inventory";

const InventoryPage = () => {
  return (
    <ProductProvider>
      <Inventory />
    </ProductProvider>
  );
};

export default Layout(InventoryPage);
