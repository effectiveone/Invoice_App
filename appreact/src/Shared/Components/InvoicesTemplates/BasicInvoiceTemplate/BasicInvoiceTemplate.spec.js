import React from "react";
import { render } from "@testing-library/react";
import { InvoiceContext } from "../../../Context/useInvoiceContext";
import BasicInvoiceTemplate from "./BasicInvoiceTemplate";

describe("BasicInvoiceTemplate", () => {
  const mockCompanyData = {
    companyName: "Mock Company",
    legalForm: "Mock Legal Form",
    zipCode: "00-000",
    city: "Mock City",
    street: "Mock Street",
    nip: "1234567890",
  };

  const mockSelectedKontrahent = {
    kontrahent_companyName: "Mock Kontrahent",
    kontrahent_legalForm: "Mock Legal Form",
    kontrahent_zipCode: "00-000",
    kontrahent_city: "Mock City",
    kontrahent_street: "Mock Street",
    kontrahent_nip: "0987654321",
  };

  const mockContextValue = {
    componentRef: jest.fn(),
    companyData: mockCompanyData,
    selectedKontrahent: mockSelectedKontrahent,
  };

  it("should render company details with correct data", () => {
    const { getByText } = render(
      <InvoiceContext.Provider value={mockContextValue}>
        <BasicInvoiceTemplate />
      </InvoiceContext.Provider>
    );

    const sellerTitle = getByText("Sprzedawca");
    const sellerName = getByText(mockCompanyData.companyName);
    const sellerLegalForm = getByText(mockCompanyData.legalForm);
    const sellerAddress = getByText(
      `${mockCompanyData.zipCode} ${mockCompanyData.city}, ${mockCompanyData.street}`
    );
    const sellerNip = getByText(mockCompanyData.nip);

    const buyerTitle = getByText("Nabywca");
    const buyerName = getByText(mockSelectedKontrahent.kontrahent_companyName);
    const buyerLegalForm = getByText(
      mockSelectedKontrahent.kontrahent_legalForm
    );
    const buyerAddress = getByText(
      `${mockSelectedKontrahent.kontrahent_zipCode} ${mockSelectedKontrahent.kontrahent_city}, ${mockSelectedKontrahent.kontrahent_street}`
    );
    const buyerNip = getByText(mockSelectedKontrahent.kontrahent_nip);

    expect(sellerTitle).toBeInTheDocument();
    expect(sellerName).toBeInTheDocument();
    expect(sellerLegalForm).toBeInTheDocument();
    expect(sellerAddress).toBeInTheDocument();
    expect(sellerNip).toBeInTheDocument();

    expect(buyerTitle).toBeInTheDocument();
    expect(buyerName).toBeInTheDocument();
    expect(buyerLegalForm).toBeInTheDocument();
    expect(buyerAddress).toBeInTheDocument();
    expect(buyerNip).toBeInTheDocument();
  });

  it("should render invoice table", () => {
    const { getByRole } = render(
      <InvoiceContext.Provider value={mockContextValue}>
        <BasicInvoiceTemplate />
      </InvoiceContext.Provider>
    );

    const table = getByRole("table");

    expect(table).toBeInTheDocument();
  });
});
