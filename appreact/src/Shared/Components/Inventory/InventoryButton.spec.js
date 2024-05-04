import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useProductContext } from "../../Context/useProductContext";
import InventoryButton from "./InventoryButton";

jest.mock("../../Context/useProductContext");

describe("InventoryButton component", () => {
  test("should call handleModal on button click", () => {
    const handleModal = jest.fn();
    useProductContext.mockReturnValue({ handleModal });

    const { getByTestId } = render(<InventoryButton />);
    const inventoryButton = getByTestId("inventory-button");
    fireEvent.click(inventoryButton);

    expect(handleModal).toHaveBeenCalledTimes(1);
  });
});
