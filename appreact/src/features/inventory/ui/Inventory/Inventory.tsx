import React from 'react';
import InventoryTable from './InventoryTable';
import InventoryButton from './InventoryButton';
import InventoryModal from './InventoryModal';

const Inventory: React.FC = () => {
  return (
    <>
      <InventoryButton />
      <InventoryModal />
      <InventoryTable />
    </>
  );
};

export default Inventory;
