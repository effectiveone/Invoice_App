import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InvoicesIssuedList from "./InvoicesIssuedList";

describe("InvoicesIssuedList component", () => {
  test("renders 'Numer faktury' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Numer faktury");
    expect(column).toBe();
  });

  test("renders 'Data wystawienia' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Data wystawienia");
    expect(column).toBe();
  });

  test("renders 'Kontrahent' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Kontrahent");
    expect(column).toBe();
  });

  test("renders 'Kwota netto' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Kwota netto");
    expect(column).toBe();
  });

  test("renders 'Kwota brutto' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Kwota brutto");
    expect(column).toBe();
  });

  test("can sort table by 'Numer faktury' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Numer faktury");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "ascending");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "descending");
  });

  test("can sort table by 'Data wystawienia' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Data wystawienia");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "ascending");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "descending");
  });

  test("can sort table by 'Kontrahent' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Kontrahent");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "ascending");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "descending");
  });

  test("can sort table by 'Kwota netto' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Kwota netto");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "ascending");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "descending");
  });

  test("can sort table by 'Kwota brutto' column", () => {
    render(<InvoicesIssuedList />);
    const column = screen.getByText("Kwota brutto");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "ascending");

    fireEvent.click(column);
    expect(column).toHaveAttribute("aria-sort", "descending");
  });
});
