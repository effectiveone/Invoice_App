import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomPrimaryButton from "../../Shared/Components/CustomPrimaryButton";
import RedirectInfo from "../../Shared/Components/RedirectInfo";
import LoginPageFooter from "./LoginPageFooter";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("LoginPageFooter", () => {
  let mockIsFormValid;
  let mockHandleLogin;

  beforeEach(() => {
    mockIsFormValid = true;
    mockHandleLogin = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display a custom button with the label 'Log in'", () => {
    render(
      <CustomPrimaryButton
        label="Log in"
        additionalStyles={{ marginTop: "30px" }}
      />
    );
    expect(screen.getByRole("button")).toHaveTextContent("Log in");
  });

  it("should display redirect information", () => {
    const redirectText = "Create an account";
    const redirectHandler = jest.fn();
    render(
      <RedirectInfo
        text="Need an account? "
        redirectText={redirectText}
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={redirectHandler}
      />
    );
    expect(screen.getByText("Need an account? ")).toBeInTheDocument();
    expect(screen.getByText(redirectText)).toBeInTheDocument();
  });

  it("should display a tooltip with form message", () => {
    render(
      <Tooltip title="Press to log in!">
        <CustomPrimaryButton
          label="Log in"
          additionalStyles={{ marginTop: "30px" }}
          disabled={mockIsFormValid}
          onClick={mockHandleLogin}
        />
      </Tooltip>
    );
    expect(screen.getByText("Log in")).toBeInTheDocument();
    userEvent.hover(screen.getByText("Log in"));
    expect(screen.getByText("Press to log in!")).toBeInTheDocument();
  });

  it("should invoke handleLogin function on click when form is valid", () => {
    render(
      <LoginPageFooter
        handleLogin={mockHandleLogin}
        isFormValid={mockIsFormValid}
      />
    );
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
  });

  it("should not invoke handleLogin function on click when form is not valid", () => {
    mockIsFormValid = false;
    render(
      <LoginPageFooter
        handleLogin={mockHandleLogin}
        isFormValid={mockIsFormValid}
      />
    );
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it("should redirect to registration page on 'Create an account' link click", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={() => mockNavigate("/register")}
      />
    );
    const link = screen.getByText("Create an account");
    userEvent.click(link);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
