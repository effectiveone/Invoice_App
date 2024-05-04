import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginPageInputs from "./LoginPageInputs";

describe("LoginPageInputs", () => {
  it("should render input fields with proper labels and placeholders", () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <LoginPageInputs
        mail=""
        setMail={() => {}}
        password=""
        setPassword={() => {}}
      />
    );

    expect(getByLabelText("E-mail")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter e-mail address")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter password")).toBeInTheDocument();
  });

  it("should update mail and password states when typing in the inputs", () => {
    const setMail = jest.fn();
    const setPassword = jest.fn();
    const { getByLabelText } = render(
      <LoginPageInputs
        mail=""
        setMail={setMail}
        password=""
        setPassword={setPassword}
      />
    );

    fireEvent.change(getByLabelText("E-mail"), { target: { value: "test" } });
    expect(setMail).toHaveBeenCalledWith("test");

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "test123" },
    });
    expect(setPassword).toHaveBeenCalledWith("test123");
  });
});
