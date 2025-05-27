import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useProductContext } from '../../../../entities/product/model/useProductContext';
import ProductForm from './ProductForm';

jest.mock('../../../../entities/product/model/useProductContext');

describe('ProductForm component', () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockProduct = {
    name: '',
    code: '',
    netPrice: '',
    vat: '',
    grossPrice: '',
    currency: '',
    description: '',
    tags: '',
    quantity: '',
    service: '',
    purchaseNetPrice: '',
    purchaseVat: '',
    purchaseGrossPrice: '',
    unit: '',
    defaultQuantity: '',
    pkwiu: '',
    supplierCode: '',
    accountingCode: '',
  };
  const mockErrors = {
    name: '',
    code: '',
    netPrice: '',
    vat: '',
    grossPrice: '',
    currency: '',
    description: '',
    tags: '',
    quantity: '',
    service: '',
    purchaseNetPrice: '',
    purchaseVat: '',
    purchaseGrossPrice: '',
    unit: '',
    defaultQuantity: '',
    pkwiu: '',
    supplierCode: '',
    accountingCode: '',
  };

  beforeEach(() => {
    useProductContext.mockReturnValue({
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      product: mockProduct,
      errors: mockErrors,
    });
  });

  test('renders without errors', () => {
    const { container } = render(<ProductForm />);
    expect(container).toBeInTheDocument();
  });

  test('renders form inputs', () => {
    render(<ProductForm />);

    // Test that form inputs are present
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('renders form element', () => {
    render(<ProductForm />);

    // Test that form element exists
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });
});
