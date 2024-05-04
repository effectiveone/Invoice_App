import React from "react";
import { render } from "@testing-library/react";
import Inventory from "./Inventory";

jest.mock("../../Context/useProductContext");

describe("Inventory component", () => {
  test("renders Inventory component", () => {
    const { getByTestId } = render(<Inventory />);
    const inventoryComponent = getByTestId("inventory-component");
    expect(inventoryComponent).toBeInTheDocument();
  });

  test("renders InventoryModal", () => {
    const { getByTestId } = render(<Inventory />);
    const inventoryModal = getByTestId("inventory-modal");
    expect(inventoryModal).toBeInTheDocument();
  });

  test("renders InventoryTable", () => {
    const { getByTestId } = render(<Inventory />);
    const inventoryTable = getByTestId("inventory-table");
    expect(inventoryTable).toBeInTheDocument();
  });
});
