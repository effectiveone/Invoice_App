import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useProductContext } from "../../Context/useProductContext";
import InventoryModal from "./InventoryModal";
import ProductForm from "./ProductForm";

jest.mock("../../Context/useProductContext");

describe("InventoryModal", () => {
  test("renders correctly when open", () => {
    useProductContext.mockReturnValue({
      open: true,
      handleClose: jest.fn(),
      updatedCompanyData: {},
      handleChange: jest.fn(),
      button: <button data-testid="test-button">Test Button</button>,
    });

    render(<InventoryModal />);

    const modal = screen.getByTestId("inventory-modal");
    expect(modal).toBeInTheDocument();

    const cancelButton = screen.getByText("cancel");
    expect(cancelButton).toBeInTheDocument();

    const testButton = screen.getByTestId("test-button");
    expect(testButton).toBeInTheDocument();

    const productForm = screen.getByRole("form", { name: "product-form" });
    expect(productForm).toBeInTheDocument();
  });

  test("renders correctly when closed", () => {
    useProductContext.mockReturnValue({
      open: false,
      handleClose: jest.fn(),
      updatedCompanyData: {},
      handleChange: jest.fn(),
      button: <button data-testid="test-button">Test Button</button>,
    });

    render(<InventoryModal />);

    const modal = screen.queryByTestId("inventory-modal");
    expect(modal).not.toBeInTheDocument();

    const cancelButton = screen.queryByText("cancel");
    expect(cancelButton).not.toBeInTheDocument();

    const testButton = screen.queryByTestId("test-button");
    expect(testButton).not.toBeInTheDocument();

    const productForm = screen.queryByRole("form", { name: "product-form" });
    expect(productForm).not.toBeInTheDocument();
  });

  test("clicking cancel button calls handleClose function", () => {
    const handleClose = jest.fn();
    useProductContext.mockReturnValue({
      open: true,
      handleClose,
      updatedCompanyData: {},
      handleChange: jest.fn(),
      button: <button data-testid="test-button">Test Button</button>,
    });

    render(<InventoryModal />);

    const cancelButton = screen.getByText("cancel");
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });

  test("should call handleClose when clicking the cancel button", () => {
    const handleClose = jest.fn();
    useProductContext.mockReturnValue({ open: true, handleClose });

    const { getByText } = render(<InvenotryModal />);
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("should render ProductForm component", () => {
    useProductContext.mockReturnValue({ open: true });

    const { getByTestId } = render(<InvenotryModal />);
    const productForm = getByTestId("product-form");

    expect(productForm).toBeInTheDocument();
  });
});
