import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { InvoiceComponent } from "./InvoiceComponent";

describe("InvoiceComponent", () => {
  const props = {
    selectedKontrahent: { companyName: "Test company" },
    totalNetValue: "100",
    totalGrossValue: "123",
    invoiceSaleDate: "2022-01-01",
    changeInvoiceNumber: jest.fn(),
    handleOpen: jest.fn(),
  };

  it("renders all props values correctly", () => {
    const { getByText } = render(<InvoiceComponent {...props} />);
    expect(getByText(props.selectedKontrahent.companyName)).toBeInTheDocument();
    expect(getByText(props.totalNetValue)).toBeInTheDocument();
    expect(getByText(props.totalGrossValue)).toBeInTheDocument();
    expect(getByText("Edytuj")).toBeInTheDocument();
  });

  it("calls changeInvoiceNumber and handleOpen when button is clicked", () => {
    const { getByText } = render(<InvoiceComponent {...props} />);
    const button = getByText("Edytuj");
    fireEvent.click(button);
    expect(props.changeInvoiceNumber).toHaveBeenCalledWith(props.invoiceNumber);
    expect(props.handleOpen).toHaveBeenCalled();
  });
});
