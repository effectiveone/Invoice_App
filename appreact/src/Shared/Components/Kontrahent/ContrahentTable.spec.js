import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Button, Modal } from "@material-ui/core";
import ContrahentTable from "./ContrahentTable";
import { KontrahentContextProvider } from "../../Context/useKontrahentContext";
import CompanyForm from "../Company/companyForm";
import "@testing-library/jest-dom/extend-expect";

describe("ContrahentModal", () => {
  test("should render the table", () => {
    render(<ContrahentTable />);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
  test("should call handleEdit function when edit button is clicked", () => {
    const handleEdit = jest.fn();
    const kontrahent = [
      {
        _id: "12345",
        companyName: "Example Company",
        legalForm: "Ltd",
        nip: "1234567890",
        city: "New York",
      },
    ];
    render(
      <useKontrahentContext.Provider value={{ handleEdit }}>
        <ContrahentTable />
      </useKontrahentContext.Provider>
    );
    const editButton = screen.getByText("Edytuj");
    userEvent.click(editButton);
    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith("12345");
  });
  test("should call handleDelete function when delete button is clicked", () => {
    const handleDelete = jest.fn();
    const kontrahent = [
      {
        _id: "12345",
        companyName: "Example Company",
        legalForm: "Ltd",
        nip: "1234567890",
        city: "New York",
      },
    ];
    render(
      <useKontrahentContext.Provider value={{ handleDelete }}>
        <ContrahentTable />
      </useKontrahentContext.Provider>
    );
    const deleteButton = screen.getByText("Usuń");
    userEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith("12345");
  });
  test("should sort table by company name in ascending order", () => {
    const kontrahent = [
      {
        _id: "1",
        companyName: "Coca Cola",
        legalForm: "Ltd",
        nip: "1234567890",
        city: "New York",
      },
      {
        _id: "2",
        companyName: "Apple",
        legalForm: "Ltd",
        nip: "0987654321",
        city: "Cupertino",
      },
    ];
    render(<ContrahentTable />);
    const companyNameColumn = screen.getByText("Nazwa fromy");
    userEvent.click(companyNameColumn);
    const firstRow = screen.getByTestId("row-0");
    expect(within(firstRow).getByText("Apple")).toBeInTheDocument();
  });
  test("should filter table by company name", async () => {
    const kontrahent = [
      {
        _id: "1",
        companyName: "Coca Cola",
        legalForm: "Ltd",
        nip: "1234567890",
        city: "New York",
      },
      {
        _id: "2",
        companyName: "Apple",
        legalForm: "Ltd",
        nip: "0987654321",
        city: "Cupertino",
      },
    ];
    render(<ContrahentTable />);
  });
});
