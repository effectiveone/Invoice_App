import React from "react";
import { render } from "@testing-library/react";
import LoginPageHeader from "./LoginPageHeader";
import "@testing-library/jest-dom";

describe("LoginPageHeader", () => {
  it("renders the welcome back title", () => {
    const { getByText } = render(<LoginPageHeader />);
    expect(getByText("Welcome Back!")).toBeInTheDocument();
  });

  it("renders the happy message", () => {
    const { getByText } = render(<LoginPageHeader />);
    expect(getByText("We are happy that you are with us!")).toBeInTheDocument();
  });
});
