import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CompanyForm from "./CompanyForm";
import "@testing-library/jest-dom/extend-expect";

describe("CompanyForm component", () => {
  it("should render all input fields", () => {
    render(<CompanyForm />);
    expect(screen.getByLabelText("Forma prawna")).toBeInTheDocument();
    expect(screen.getByLabelText("Nazwa firmy")).toBeInTheDocument();
    expect(screen.getByLabelText("NIP")).toBeInTheDocument();
    expect(screen.getByLabelText("REGON")).toBeInTheDocument();
    expect(screen.getByLabelText("Ulica")).toBeInTheDocument();
    expect(screen.getByLabelText("Miasto")).toBeInTheDocument();
    expect(screen.getByLabelText("Kod pocztowy")).toBeInTheDocument();
  });

  it("should update companyData state when input fields are changed", () => {
    render(<CompanyForm />);
    const input = screen.getByLabelText("Nazwa firmy");
    fireEvent.change(input, { target: { value: "CompanyForm" } });
    expect(input).toHaveValue("CompanyForm");
  });
});
