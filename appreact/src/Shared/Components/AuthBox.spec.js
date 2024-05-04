import React from "react";
import { render } from "@testing-library/react";
import AuthBox from "./AuthBox";

describe("AuthBox", () => {
  it("should render children", () => {
    const { getByText } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByText("Child Component")).toBeInTheDocument();
  });

  it("should have background color #5865F2", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("box-wrapper")).toHaveStyle("background: #5865F2");
  });

  it("should have a width of 100%", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("box-wrapper")).toHaveStyle("width: 100%");
  });

  it("should have a height of 100vh", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("box-wrapper")).toHaveStyle("height: 100vh");
  });

  it("should have flex display and center align items and justify content", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("box-wrapper")).toHaveStyle(
      "display: flex; align-items: center; justify-content: center;"
    );
  });

  it("should have a child component with width of 700px", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("auth-box")).toHaveStyle("width: 700px");
  });

  it("should have a child component with height of 400px", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("auth-box")).toHaveStyle("height: 400px");
  });

  it("should have a child component with background color #36393f", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("auth-box")).toHaveStyle("background-color: #36393f");
  });

  it("should have a child component with 5px border radius", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("auth-box")).toHaveStyle("border-radius: 5px");
  });

  it("should have a child component with a box shadow", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("auth-box")).toHaveStyle(
      "box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%)"
    );
  });

  it("should have a child component with 25px padding", () => {
    const { getByTestId } = render(<AuthBox>Child Component</AuthBox>);
    expect(getByTestId("auth-box")).toHaveStyle("padding: 25px");
  });
});
