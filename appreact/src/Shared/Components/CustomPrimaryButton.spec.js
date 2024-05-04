import React from "react";
import { shallow } from "enzyme";
import CustomPrimaryButton from "./CustomPrimaryButton";

describe("CustomPrimaryButton", () => {
  let wrapper;

  const props = {
    label: "Submit",
    additionalStyles: {
      marginTop: "20px",
    },
    disabled: false,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<CustomPrimaryButton {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render a Button component", () => {
    expect(wrapper.find("Button").length).toBe(1);
  });

  it("should render a Button component with the correct label", () => {
    expect(wrapper.find("Button").text()).toBe(props.label);
  });

  it("should render a disabled Button component if disabled prop is true", () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper.find("Button").prop("disabled")).toBe(true);
  });

  it("should render a Button component with additional styles if additionalStyles prop is provided", () => {
    expect(wrapper.find("Button").prop("style")).toEqual(props.additionalStyles);
  });

  it("should call onClick function when button is clicked", () => {
    wrapper.find("Button").simulate("click");
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
