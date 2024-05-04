import { render } from "@testing-library/react";
import { useCompanyContext, CompanyProvider } from "./CompanyProvider";
import { useCompany } from "../Hook/useCompany";

jest.mock("../Hook/useCompany");

describe("CompanyProvider", () => {
  it("renders children", () => {
    const { getByTestId } = render(
      <CompanyProvider>
        <div data-testid="child-element" />
      </CompanyProvider>
    );
    expect(getByTestId("child-element")).toBeInTheDocument();
  });

  it("provides company data through the context", () => {
    const mockCompanyData = {
      name: "Mock Company",
      address: "123 Mock St.",
      phone: "555-555-5555",
    };
    useCompany.mockReturnValue(mockCompanyData);

    const ConsumerComponent = () => {
      const { companyData } = useCompanyContext();
      return (
        <div data-testid="company-data">{JSON.stringify(companyData)}</div>
      );
    };

    const { getByTestId } = render(
      <CompanyProvider>
        <ConsumerComponent />
      </CompanyProvider>
    );

    expect(getByTestId("company-data")).toHaveTextContent(
      JSON.stringify(mockCompanyData)
    );
  });
});
