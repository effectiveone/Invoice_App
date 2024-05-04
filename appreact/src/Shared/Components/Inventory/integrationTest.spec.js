import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { t, initReactI18next } from "i18next";
import i18n from "i18next";
import Inventory from "./Inventory";
import { useProductContext } from "../../Context/useProductContext";

jest.mock("../../Context/useProductContext", () => ({
  useProductContext: jest.fn(),
}));

const mockHandleModal = jest.fn();
const mockHandleClose = jest.fn();
const mockHandleDelete = jest.fn();
const mockHandleEdit = jest.fn();
const mockSetButtonText = jest.fn();

describe("Inventory", () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: "en",
      fallbackLng: "en",
      resources: {
        en: {
          translation: {
            addProduct: "Add Product",
            cancel: "Cancel",
            edit: "Edit",
            delete: "Delete",
          },
        },
      },
    });

    useProductContext.mockImplementation(() => ({
      handleModal: mockHandleModal,
      open: false,
      handleClose: mockHandleClose,
      productList: [],
      handleDelete: mockHandleDelete,
      handleEdit: mockHandleEdit,
      setButtonText: mockSetButtonText,
    }));
  });

  it("renders InventoryButton, InventoryModal andInventoryTable components", () => {
    const { getByTestId } = render(<Inventory />);

    const inventoryButton = getByTestId("inventory-button");
    expect(inventoryButton).toBeInTheDocument();

    const inventoryModal = getByTestId("inventory-modal");
    expect(inventoryModal).toBeInTheDocument();

    const inventoryTable = getByTestId("inventory-table");
    expect(inventoryTable).toBeInTheDocument();
  });

  it("opens and closes InventoryModal when InventoryButton is clicked", () => {
    useProductContext.mockImplementation(() => ({
      ...useProductContext(),
      open: true,
    }));

    const { getByTestId, queryByTestId } = render(<Inventory />);

    const inventoryButton = getByTestId("inventory-button");
    fireEvent.click(inventoryButton);
    expect(mockHandleModal).toHaveBeenCalled();

    const inventoryModal = getByTestId("inventory-modal");
    expect(inventoryModal).toBeInTheDocument();

    const cancelButton = within(inventoryModal).queryByText(t("cancel"));
    fireEvent.click(cancelButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
