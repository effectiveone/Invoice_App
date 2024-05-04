import { render } from "@testing-library/react";
import { useInvoice } from "../Hook/useInvoice";
import { InvoiceProvider, InvoiceContext } from "./InvoiceProvider";

jest.mock("../Hook/useInvoice");

describe("InvoiceProvider", () => {
  it("renders children components", () => {
    const { getByText } = render(
      <InvoiceProvider>
        <div>Test</div>
      </InvoiceProvider>
    );

    expect(getByText("Test")).toBeInTheDocument();
  });

  it("provides the invoice data through context", () => {
    useInvoice.mockReturnValue({
      invoiceData: { id: 1, name: "Test Invoice" },
      updateInvoiceData: jest.fn(),
    });

    const { getByText } = render(
      <InvoiceProvider>
        <InvoiceContext.Consumer>
          {(context) => <div>{context.invoiceData.name}</div>}
        </InvoiceContext.Consumer>
      </InvoiceProvider>
    );

    expect(getByText("Test Invoice")).toBeInTheDocument();
  });
});
