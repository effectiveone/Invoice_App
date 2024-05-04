import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RedirectInfo from "./RedirectInfo";

describe("RedirectInfo component", () => {
  const text = "Some text";
  const redirectText = "Redirect";
  const redirectHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders text and redirect text", () => {
    render(
      <RedirectInfo
        text={text}
        redirectText={redirectText}
        redirectHandler={redirectHandler}
      />
    );
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(redirectText)).toBeInTheDocument();
  });

  test("calls redirectHandler when redirect text is clicked", () => {
    render(
      <RedirectInfo
        text={text}
        redirectText={redirectText}
        redirectHandler={redirectHandler}
      />
    );
    const redirectElement = screen.getByText(redirectText);
    fireEvent.click(redirectElement);
    expect(redirectHandler).toHaveBeenCalledTimes(1);
  });

  test("applies additional styles when provided", () => {
    const additionalStyles = { fontWeight: "bold" };
    render(
      <RedirectInfo
        text={text}
        redirectText={redirectText}
        redirectHandler={redirectHandler}
        additionalStyles={additionalStyles}
      />
    );
    const redirectElement = screen.getByText(redirectText);
    expect(redirectElement).toHaveStyle("font-weight: bold");
  });
});
