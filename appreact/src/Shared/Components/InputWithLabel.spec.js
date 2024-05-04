import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputWithLabel from "./InputWithLabel";

describe("InputWithLabel component", () => {
  const label = "Test Label";
  const type = "text";
  const placeholder = "Test Placeholder";

  it("renders label and input element correctly", () => {
    const value = "Test Value";
    const setValue = jest.fn();
    render(
      <InputWithLabel
        value={value}
        setValue={setValue}
        label={label}
        type={type}
        placeholder={placeholder}
      />
    );
    const input = screen.getByRole("textbox");
    const labelElement = screen.getByText(label);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
    expect(labelElement).toBeInTheDocument();
  });

  it("calls setValue function on input change", () => {
    const value = "Test Value";
    const setValue = jest.fn();
    render(
      <InputWithLabel
        value={value}
        setValue={setValue}
        label={label}
        type={type}
        placeholder={placeholder}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "New Value" } });

    expect(setValue).toHaveBeenCalled();
  });
});
