import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import KontrahentContent from "./KontrahentContent";
import { KontrahentContext } from "../../Context/useKontrahentContext";

describe("KontrahentContent", () => {
  const mockHandleModal = jest.fn();

  const mockKontrahentContext = {
    handleModal: mockHandleModal,
  };

  beforeEach(() => {
    render(
      <KontrahentContext.Provider value={mockKontrahentContext}>
        <KontrahentContent />
      </KontrahentContext.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Add Kontrahent button", () => {
    const addKontrahentButton = screen.getByRole("button", {
      name: "Add Kontrahent",
    });
    expect(addKontrahentButton).toBeInTheDocument();
  });

  it("should call handleModal on Add Kontrahent button click", () => {
    const addKontrahentButton = screen.getByRole("button", {
      name: "Add Kontrahent",
    });
    fireEvent.click(addKontrahentButton);
    expect(mockHandleModal).toHaveBeenCalled();
  });
});
