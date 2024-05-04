import React from "react";
import { shallow } from "enzyme";
import { Typography } from "@mui/material";
import AuthBox from "../../Shared/Components/AuthBox";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import RegisterPage from "./RegisterPage";

describe("RegisterPage", () => {
  let wrapper;
  const mockRegister = jest.fn();
  const history = {
    push: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<RegisterPage register={mockRegister} />);
  });

  it("renders without errors", () => {
    const component = wrapper.find("[data-test='RegisterPage']");
    expect(component.length).toBe(1);
  });

  it("contains an AuthBox component", () => {
    const authBox = wrapper.find(AuthBox);
    expect(authBox.length).toBe(1);
  });

  it("contains a Typography component with the text 'Create an account'", () => {
    const typography = wrapper.find(Typography);
    expect(typography.length).toBe(1);
    expect(typography.props().children).toBe("Create an account");
  });

  it("contains a RegisterPageInputs component", () => {
    const registerPageInputs = wrapper.find(RegisterPageInputs);
    expect(registerPageInputs.length).toBe(1);
  });

  it("contains a RegisterPageFooter component", () => {
    const registerPageFooter = wrapper.find(RegisterPageFooter);
    expect(registerPageFooter.length).toBe(1);
  });

  it("passes the correct props to RegisterPageInputs component", () => {
    const registerPageInputs = wrapper.find(RegisterPageInputs);
    expect(registerPageInputs.props().mail).toBe("");
    expect(typeof registerPageInputs.props().setMail).toBe("function");
    expect(registerPageInputs.props().username).toBe("");
    expect(typeof registerPageInputs.props().setUsername).toBe("function");
    expect(registerPageInputs.props().password).toBe("");
    expect(typeof registerPageInputs.props().setPassword).toBe("function");
  });

  it("passes the correct props to RegisterPageFooter component", () => {
    const registerPageFooter = wrapper.find(RegisterPageFooter);
    expect(typeof registerPageFooter.props().handleRegister).toBe("function");
    expect(registerPageFooter.props().isFormValid).toBe(false);
  });

  describe("handleRegister", () => {
    it("calls the register function with the correct arguments and pushes to history", () => {
      const registerPageFooter = wrapper.find(RegisterPageFooter);
      wrapper.setState({
        mail: "test@example.com",
        username: "testuser",
        password: "testpassword",
        isFormValid: true,
      });
      registerPageFooter.props().handleRegister();
      expect(mockRegister).toHaveBeenCalledTimes(1);
      expect(mockRegister).toHaveBeenCalledWith(
        {
          mail: "test@example.com",
          password: "testpassword",
          username: "testuser",
        },
        history
      );
    });
  });

  describe("useEffect", () => {
    it("calls setIsFormValid with the correct value when mail, username, or password state changes", () => {
      const setIsFormValid = jest.fn();
      jest
        .spyOn(React, "useState")
        .mockImplementationOnce(() => ["", jest.fn()]);
      jest
        .spyOn(React, "useState")
        .mockImplementationOnce(() => ["", jest.fn()]);
      jest
        .spyOn(React, "useState")
        .mockImplementationOnce(() => ["", jest.fn()]);
      jest
        .spyOn(React, "useState")
        .mockImplementationOnce(() => [false, setIsFormValid]);

      const registerPage = shallow(
        <RegisterPage register={mockhandleRegister} />
      );
      const inputs = registerPage.find(RegisterPageInputs);
      // simulate changes to email, username, and password inputs
      inputs.props().setMail("test@test.com");
      inputs.props().setUsername("testuser");
      inputs.props().setPassword("password");

      expect(setIsFormValid).toHaveBeenCalledWith(true);
    });
  });

  describe("handleSubmit", () => {
    it("calls register function with the correct user details and history object", () => {
      const register = jest.fn();
      const history = { push: jest.fn() };

      const registerPage = shallow(<RegisterPage register={register} />);
      const footer = registerPage.find(RegisterPageFooter);

      // simulate changes to email, username, and password inputs
      footer.props().handleRegister();

      expect(register).toHaveBeenCalledWith(
        {
          mail: "",
          username: "",
          password: "",
        },
        history
      );
    });
  });
});
