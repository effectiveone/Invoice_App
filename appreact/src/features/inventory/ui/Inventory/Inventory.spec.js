import React from 'react';
import { render } from '@testing-library/react';
import Inventory from './Inventory';

// Mock all required modules
jest.mock('../../../../entities/product/model/useProductContext', () => ({
  useProductContext: () => ({
    products: [],
    handleEdit: jest.fn(),
    handleDelete: jest.fn(),
    setButtonText: jest.fn(),
  }),
}));

jest.mock('./InventoryModal', () => {
  return function MockInventoryModal() {
    return <div data-testid='inventory-modal'>InventoryModal</div>;
  };
});

jest.mock('./InventoryTable', () => {
  return function MockInventoryTable() {
    return <div data-testid='inventory-table'>InventoryTable</div>;
  };
});

describe('Inventory component', () => {
  test('renders Inventory component', () => {
    const { container } = render(<Inventory />);
    expect(container).toBeInTheDocument();
  });

  test('renders without errors', () => {
    const { container } = render(<Inventory />);
    expect(container.firstChild).toBeTruthy();
  });
});
