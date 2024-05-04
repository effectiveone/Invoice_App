import React from "react";
import { render } from "@testing-library/react";
import NewInvoice from "./NewInvoice";

test("renders preview button", () => {
  const { getByText } = render(<NewInvoice />);
  const previewButton = getByText("Podgląd");
  expect(previewButton).toBeVisible();
});
