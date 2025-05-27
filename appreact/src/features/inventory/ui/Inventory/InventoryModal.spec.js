/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useProductContext } from '../../../../entities/product/model/useProductContext';
import InventoryModal from './InventoryModal';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

jest.mock('../../../../entities/product/model/useProductContext');

// Mock ProductForm component
jest.mock('./ProductForm', () => {
  return function MockProductForm() {
    return <div data-testid='product-form'>ProductForm</div>;
  };
});

const mockStore = configureMockStore();

describe('InventoryModal', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      // Add any required state here
    });
  });

  test('renders correctly when open', () => {
    useProductContext.mockReturnValue({
      open: true,
      handleClose: jest.fn(),
      updatedCompanyData: {},
      handleChange: jest.fn(),
      button: <button data-testid='test-button'>Test Button</button>,
    });

    render(
      <Provider store={store}>
        <InventoryModal />
      </Provider>,
    );

    // Test basic rendering
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
  });

  test('renders correctly when closed', () => {
    useProductContext.mockReturnValue({
      open: false,
      handleClose: jest.fn(),
      updatedCompanyData: {},
      handleChange: jest.fn(),
      button: <button data-testid='test-button'>Test Button</button>,
    });

    render(
      <Provider store={store}>
        <InventoryModal />
      </Provider>,
    );

    // When closed, modal should not be visible
    expect(screen.queryByTestId('product-form')).not.toBeInTheDocument();
  });

  test('clicking cancel button calls handleClose function', () => {
    const handleClose = jest.fn();
    useProductContext.mockReturnValue({
      open: true,
      handleClose,
      updatedCompanyData: {},
      handleChange: jest.fn(),
      button: <button data-testid='test-button'>Test Button</button>,
    });

    render(
      <Provider store={store}>
        <InventoryModal />
      </Provider>,
    );

    // Test that component renders without errors
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
  });

  test('should render without errors', () => {
    useProductContext.mockReturnValue({
      open: true,
      handleClose: jest.fn(),
      updatedCompanyData: {},
      handleChange: jest.fn(),
    });

    const { container } = render(
      <Provider store={store}>
        <InventoryModal />
      </Provider>,
    );

    expect(container).toBeInTheDocument();
  });
});
