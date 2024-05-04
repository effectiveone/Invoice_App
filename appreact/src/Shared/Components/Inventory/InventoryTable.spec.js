import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContrahentTable from "./ContrahentTable";

describe("ContrahentTable", () => {
  const mockHandleOpen = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockHandleEdit = jest.fn();
  const mockSetButtonText = jest.fn();
  const mockProductList = [
    {
      _id: "1",
      name: "Product 1",
      vat: 23,
      netPrice: 100,
      unit: 5,
    },
    {
      _id: "2",
      name: "Product 2",
      vat: 8,
      netPrice: 50,
      unit: 2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the product list", () => {
    render(
      <ContrahentTable
        productList={mockProductList}
        handleOpen={mockHandleOpen}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        setButtonText={mockSetButtonText}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  test("calls handleOpen on edit button click", () => {
    render(
      <ContrahentTable
        productList={mockProductList}
        handleOpen={mockHandleOpen}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        setButtonText={mockSetButtonText}
      />
    );

    fireEvent.click(screen.getByText("Edytuj").closest("button"));

    expect(mockHandleOpen).toHaveBeenCalledTimes(1);
  });

  test("calls handleDelete on delete button click", () => {
    render(
      <ContrahentTable
        productList={mockProductList}
        handleOpen={mockHandleOpen}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        setButtonText={mockSetButtonText}
      />
    );

    fireEvent.click(screen.getByText("Usuń").closest("button"));

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    expect(mockHandleDelete).toHaveBeenCalledWith("1");
  });

  test("calls handleEdit and setButtonText on edit button click", () => {
    render(
      <ContrahentTable
        productList={mockProductList}
        handleOpen={mockHandleOpen}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        setButtonText={mockSetButtonText}
      />
    );

    fireEvent.click(screen.getByText("Edytuj").closest("button"));

    expect(mockHandleEdit).toHaveBeenCalledTimes(1);
    expect(mockSetButtonText).toHaveBeenCalledTimes(1);
    expect(mockSetButtonText).toHaveBeenCalledWith("Zapisz zmiany");
  });
});
