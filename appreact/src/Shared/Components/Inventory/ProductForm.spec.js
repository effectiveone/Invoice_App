import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useProductContext } from "../../Context/useProductContext";
import ProductForm from "./ProductForm";

jest.mock("../../Context/useProductContext");

describe("ProductForm component", () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockProduct = {
    name: "Test Product",
    code: "TP001",
    netPrice: "10.00",
    vat: "23%",
    grossPrice: "12.30",
    currency: "PLN",
    description: "Test description",
    tags: "test, product",
    quantity: "10",
    service: "",
    purchaseNetPrice: "",
    purchaseVat: "",
    purchaseGrossPrice: "",
    unit: "",
    defaultQuantity: "",
    pkwiu: "",
    supplierCode: "",
    accountingCode: "",
  };
  const mockErrors = {
    name: "",
    code: "",
    netPrice: "",
    vat: "",
    grossPrice: "",
    currency: "",
    description: "",
    tags: "",
    quantity: "",
    service: "",
    purchaseNetPrice: "",
    purchaseVat: "",
    purchaseGrossPrice: "",
    unit: "",
    defaultQuantity: "",
    pkwiu: "",
    supplierCode: "",
    accountingCode: "",
  };
  const mockClasses = {
    formControl: "",
    submitButton: "",
  };
  beforeEach(() => {
    useProductContext.mockReturnValue({
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      product: mockProduct,
      errors: mockErrors,
    });
  });

  test("renders all form inputs", () => {
    render(<ProductForm />);
    expect(screen.getByLabelText("Name Product")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Code")).toBeInTheDocument();
    expect(screen.getByLabelText("Net Price")).toBeInTheDocument();
    expect(screen.getByLabelText("VAT")).toBeInTheDocument();
    expect(screen.getByLabelText("Gross Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Currency")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Tags")).toBeInTheDocument();
    expect(screen.getByLabelText("Avaible Quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Usługa")).toBeInTheDocument();
    expect(screen.getByLabelText("Purchase Net Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Purchase VAT")).toBeInTheDocument();
    expect(screen.getByLabelText("Purchase Gross Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Unit")).toBeInTheDocument();
    expect(screen.getByLabelText("Default Quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("PKWiU")).toBeInTheDocument();
    expect(screen.getByLabelText("Supplier Code")).toBeInTheDocument();
    expect(screen.getByLabelText("Accounting Code")).toBeInTheDocument();
  });

  test("renders form with correct initial values", () => {
    render(<ProductForm />);
    expect(screen.getByLabelText("Name Product")).toHaveValue(mockProduct.name);
    expect(screen.getByLabelText("Product Code")).toHaveValue(mockProduct.code);
    expect(screen.getByLabelText("Net Price")).toHaveValue(
      mockProduct.netPrice
    );
    expect(screen.getByLabelText("VAT")).toHaveValue(mockProduct.vat);
    expect(screen.getByLabelText("Gross Price")).toHaveValue(
      mockProduct.grossPrice
    );
    expect(screen.getByLabelText("Currency")).toHaveValue(mockProduct.currency);
    expect(screen.getByLabelText("Description")).toHaveValue(
      mockProduct.description
    );
    expect(screen.getByLabelText("Tags")).toHaveValue(mockProduct.tags);
    expect(screen.getByLabelText("Avaible Quantity")).toHaveValue(
      mockProduct.quantity
    );
    expect(screen.getByLabelText("Service")).toHaveValue(mockProduct.service);
    expect(screen.getByLabelText("Purchase Net Price")).toHaveValue(
      mockProduct.purchaseNetPrice
    );
    expect(screen.getByLabelText("Purchase Vat")).toHaveValue(
      mockProduct.purchaseVat
    );
    expect(screen.getByLabelText("Purchase Gross Price")).toHaveValue(
      mockProduct.purchaseGrossPrice
    );
    expect(screen.getByLabelText("Unit")).toHaveValue(mockProduct.unit);
    expect(screen.getByLabelText("Default Quantity")).toHaveValue(
      mockProduct.defaultQuantity
    );
    expect(screen.getByLabelText("PKWiU")).toHaveValue(mockProduct.pkwiu);
    expect(screen.getByLabelText("Supplier Code")).toHaveValue(
      mockProduct.supplierCode
    );
    expect(screen.getByLabelText("Accounting Code")).toHaveValue(
      mockProduct.accountingCode
    );
  });

  it("should submit form with proper product values", () => {
    const { getByRole } = render(<ProductForm />);
    const submitButton = getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("should handle form input changes", () => {
    const { getByLabelText } = render(<ProductForm />);
    const nameInput = getByLabelText("Product Name");
    fireEvent.change(nameInput, { target: { value: "Test Product" } });

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: { name: "name", value: "Test Product" },
    });
  });
});
