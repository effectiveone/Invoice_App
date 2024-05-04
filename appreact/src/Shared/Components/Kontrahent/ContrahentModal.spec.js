import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Button, Modal } from "@material-ui/core";
import ContrahentModal from "./ContrahentModal";
import { KontrahentContextProvider } from "../../Context/useKontrahentContext";
import CompanyForm from "../Company/companyForm";

jest.mock("../Company/companyForm", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="company-form-mock">CompanyFormMock</div>,
  };
});

const renderWithContext = (Component) => {
  return render(
    <KontrahentContextProvider>
      <Component />
    </KontrahentContextProvider>
  );
};

describe("ContrahentModal", () => {
  it("renders the modal when the 'open' prop is true", () => {
    const { getByTestId } = renderWithContext(() => (
      <ContrahentModal open={true} />
    ));

    expect(getByTestId("company-form-mock")).toBeInTheDocument();
  });

  it("does not render the modal when the 'open' prop is false", () => {
    const { queryByTestId } = renderWithContext(() => (
      <ContrahentModal open={false} />
    ));

    expect(queryByTestId("company-form-mock")).not.toBeInTheDocument();
  });

  it("renders the cancel button and calls 'handleClose' when clicked", () => {
    const handleClose = jest.fn();

    const { getByText } = renderWithContext(() => (
      <ContrahentModal open={true} handleClose={handleClose} />
    ));

    const cancelButton = getByText("Anuluj");
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
