import { render, screen, fireEvent } from "@testing-library/react";
import { useCompanyContext } from "../../Context/useCompanyContext";
import CompanyContent from "./CompanyContent";

jest.mock("../../Context/useCompanyContext");

describe("CompanyContent component", () => {
  beforeEach(() => {
    useCompanyContext.mockReturnValue({
      updatedCompanyData: {
        name: "Test Company",
        address: "123 Test Street",
        city: "Test City",
        state: "Test State",
        zip: "12345",
      },
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
    });
  });

  it("renders company form", () => {
    render(<CompanyContent />);
    const companyForm = screen.getByTestId("company-form");
    expect(companyForm).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<CompanyContent />);
    const submitButton = screen.getByText("Submit");
    expect(submitButton).toBeInTheDocument();
  });

  it("calls handleSubmit function when submit button is clicked", () => {
    render(<CompanyContent />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    expect(useCompanyContext().handleSubmit).toHaveBeenCalled();
  });
});
