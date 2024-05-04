import React from "react";
import { shallow } from "enzyme";
import InputWithLabel from "../../Shared/Components/InputWithLabel";
import RegisterPageInputs from "./RegisterPageInputs";

describe("RegisterPageInputs", () => {
  let wrapper, props;

  beforeEach(() => {
    props = {
      mail: "",
      setMail: jest.fn(),
      username: "",
      setUsername: jest.fn(),
      password: "",
      setPassword: jest.fn(),
    };
    wrapper = shallow(<RegisterPageInputs {...props} />);
  });

  it("renders three InputWithLabel components", () => {
    expect(wrapper.find(InputWithLabel)).toHaveLength(3);
  });

  it("passes the correct props to the InputWithLabel components", () => {
    const inputs = wrapper.find(InputWithLabel);
    expect(inputs.at(0).props()).toEqual({
      value: props.mail,
      setValue: props.setMail,
      label: "E-mail address",
      type: "text",
      placeholder: "Enter e-mail address",
    });
    expect(inputs.at(1).props()).toEqual({
      value: props.username,
      setValue: props.setUsername,
      label: "Username",
      type: "text",
      placeholder: "Enter a username",
    });
    expect(inputs.at(2).props()).toEqual({
      value: props.password,
      setValue: props.setPassword,
      label: "Password",
      type: "password",
      placeholder: "Enter password",
    });
  });
});
