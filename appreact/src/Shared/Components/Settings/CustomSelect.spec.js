import React from "react";
import { mount } from "enzyme";
import CustomSelect from "./CustomSelect";
import { useSettings } from "../../Hook/useSettings";

jest.mock("../../Hook/useSettings");

describe("CustomSelect", () => {
  const options = [
    { value: "option1", icon: "Icon1" },
    { value: "option2", icon: "Icon2" },
    { value: "option3", icon: "Icon3" },
  ];

  beforeEach(() => {
    useSettings.mockReturnValue({
      isOpen: false,
      selectedOption: options[0],
      setSelectedOption: jest.fn(),
      toggleOptions: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with the correct className and width props", () => {
    const wrapper = mount(
      <CustomSelect
        value={options[0].value}
        onChange={jest.fn()}
        options={options}
        className="custom-class"
        width="200px"
      />
    );
    expect(wrapper.find(".select-container.custom-class")).toHaveLength(1);
    expect(wrapper.find(".select-container").prop("style")).toEqual({
      width: "200px",
    });
  });

  it("should render the selected option with the correct icon", () => {
    useSettings.mockReturnValue({
      isOpen: false,
      selectedOption: options[1],
      setSelectedOption: jest.fn(),
      toggleOptions: jest.fn(),
    });
    const wrapper = mount(
      <CustomSelect
        value={options[1].value}
        onChange={jest.fn()}
        options={options}
      />
    );

    expect(wrapper.find(".selected-option").text()).toEqual("Icon2");
  });

  it("should render the options with the correct icons", () => {
    const wrapper = mount(
      <CustomSelect
        value={options[0].value}
        onChange={jest.fn()}
        options={options}
      />
    );

    expect(wrapper.find(".options")).toHaveLength(0);

    wrapper.find(".select-container").simulate("click");

    expect(wrapper.find(".options")).toHaveLength(1);
    expect(wrapper.find(".option")).toHaveLength(3);
    expect(wrapper.find(".option").at(0).text()).toEqual("Icon1");
    expect(wrapper.find(".option").at(1).text()).toEqual("Icon2");
    expect(wrapper.find(".option").at(2).text()).toEqual("Icon3");
  });

  it("should call toggleOptions on select container click", () => {
    const toggleOptions = jest.fn();
    useSettings.mockReturnValue({
      isOpen: false,
      selectedOption: options[1],
      setSelectedOption: jest.fn(),
      toggleOptions,
    });

    const wrapper = mount(
      <CustomSelect
        value={options[1].value}
        onChange={jest.fn()}
        options={options}
      />
    );

    wrapper.find(".select-container").simulate("click");
    expect(toggleOptions).toHaveBeenCalled();
  });

  it("should call setSelectedOption and onChange on option click", () => {
    const setSelectedOption = jest.fn();
    const onChange = jest.fn();
    useSettings.mockReturnValue({
      isOpen: true,
      selectedOption: options[0],
      setSelectedOption,
      toggleOptions: jest.fn(),
    });

    const wrapper = mount(
      <CustomSelect
        value={options[0].value}
        onChange={onChange}
        options={options}
      />
    );

    wrapper.find(".option").at(1).simulate("click");

    expect(setSelectedOption).toHaveBeenCalledWith(options[1]);
    expect(onChange).toHaveBeenCalledWith(options[1].value);
  });
});
