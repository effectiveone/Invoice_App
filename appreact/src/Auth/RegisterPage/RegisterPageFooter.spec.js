import React from "react";
import { shallow } from "enzyme";
import RegisterPageFooter from "../RegisterPageFooter";
import CustomPrimaryButton from "../../../Shared/Components/CustomPrimaryButton";
import RedirectInfo from "../../../Shared/Components/RedirectInfo";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("RegisterPageFooter", () => {
  let wrapper;
  const handleRegisterMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <RegisterPageFooter
        handleRegister={handleRegisterMock}
        isFormValid={true}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a Tooltip component", () => {
    expect(wrapper.find(Tooltip)).toHaveLength(1);
  });

  it("should render a CustomPrimaryButton component", () => {
    expect(wrapper.find(CustomPrimaryButton)).toHaveLength(1);
  });

  it("should render a RedirectInfo component", () => {
    expect(wrapper.find(RedirectInfo)).toHaveLength(1);
  });

  it("should call handleRegisterMock when the button is clicked", () => {
    wrapper.find(CustomPrimaryButton).simulate("click");
    expect(handleRegisterMock).toHaveBeenCalledTimes(1);
  });

  it("should call useNavigate when the redirect link is clicked", () => {
    wrapper.find(RedirectInfo).simulate("click");
    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledWith("/login");
  });

  it("should display the correct tooltip message when the form is invalid", () => {
    wrapper.setProps({ isFormValid: false });
    expect(wrapper.find(Tooltip).prop("title")).toEqual(
      "Username should contains between 3 and 12 characters and password should contains between 6 and 12 character. Also correct e-mail address should provided"
    );
  });

  it("should display the correct tooltip message when the form is valid", () => {
    expect(wrapper.find(Tooltip).prop("title")).toEqual("Press to register!");
  });
});
