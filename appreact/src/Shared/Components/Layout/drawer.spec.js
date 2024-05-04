import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PermanentDrawer from "./drawer";

describe("PermanentDrawer component", () => {
  test("renders children", () => {
    render(
      <PermanentDrawer>
        <p>Test content</p>
      </PermanentDrawer>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(<PermanentDrawer />);
    expect(screen.getByText("Nowa faktura")).toBeInTheDocument();
    expect(screen.getByText("Wszystkie faktury")).toBeInTheDocument();
    expect(screen.getByText("Moja firma")).toBeInTheDocument();
    expect(screen.getByText("Kontrahenci")).toBeInTheDocument();
    expect(screen.getByText("Ustawienia")).toBeInTheDocument();
  });
});
