import React from "react";
import { mount } from "enzyme";
import Settings from "./Settings";
import { useSettings } from "../../Hook/useSettings";
import CustomSelect from "./CustomSelect";
import TemplateCheckbox from "./templateCheckbox";

jest.mock("../../Hook/useSettings", () => ({
  useSettings: jest.fn(),
}));

describe("Settings", () => {
  let wrapper;
  const mockLanguage = "en";
  const mockSetLanguage = jest.fn();
  const mockOptions = [
    { value: "en", label: "English" },
    { value: "pl", label: "Polish" },
    { value: "fr", label: "French" },
  ];
  const mockHandleChange = jest.fn();
  const mockMySystemOfDesign = [
    { name: "Design 1" },
    { name: "Design 2" },
    { name: "Design 3" },
  ];
  const mockSelectedDesign = { name: "Design 2" };
  const mockHandleThemeChange = jest.fn();

  useSettings.mockReturnValue({
    language: mockLanguage,
    setLanguage: mockSetLanguage,
    options: mockOptions,
    mySystemOfDesign: mockMySystemOfDesign,
    selectedDesign: mockSelectedDesign,
    handleThemeChange: mockHandleThemeChange,
    handleChange: mockHandleChange,
  });

  beforeEach(() => {
    wrapper = mount(<Settings />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a select element with options for designs", () => {
    const select = wrapper.find("select");
    expect(select).toHaveLength(1);
    expect(select.prop("value")).toEqual(mockSelectedDesign.name);
    expect(select.prop("onChange")).toEqual(mockHandleThemeChange);
    const options = wrapper.find("option");
    expect(options).toHaveLength(mockMySystemOfDesign.length);
    mockMySystemOfDesign.forEach((design, index) => {
      expect(options.at(index).prop("value")).toEqual(design.name);
      expect(options.at(index).text()).toEqual(design.name);
    });
  });

  it("should render a CustomSelect component for language selection", () => {
    const customSelect = wrapper.find(CustomSelect);
    expect(customSelect).toHaveLength(1);
    expect(customSelect.prop("value")).toEqual(mockLanguage);
    expect(customSelect.prop("onChange")).toEqual(mockSetLanguage);
    expect(customSelect.prop("options")).toEqual(mockOptions);
    expect(customSelect.prop("className")).toEqual("language-select");
    expect(customSelect.prop("width")).toEqual("30px");
  });

  it("should render a TemplateCheckbox component", () => {
    const templateCheckbox = wrapper.find(TemplateCheckbox);
    expect(templateCheckbox).toHaveLength(1);
    expect(templateCheckbox.prop("onChange")).toEqual(mockHandleChange);
  });
});
