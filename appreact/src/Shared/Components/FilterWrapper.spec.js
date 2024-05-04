import React from "react";
import { shallow } from "enzyme";
import { FilterWrapper } from "./FilterWrapper";

describe("<FilterWrapper />", () => {
  const handleFilterChange = jest.fn();

  it("renders without crashing", () => {
    shallow(<FilterWrapper handleFilterChange={handleFilterChange} />);
  });

  it("renders the search input", () => {
    const wrapper = shallow(
      <FilterWrapper handleFilterChange={handleFilterChange} />
    );
    expect(wrapper.find("input").length).toBe(1);
  });

  it("calls handleFilterChange function on input change", () => {
    const wrapper = shallow(
      <FilterWrapper handleFilterChange={handleFilterChange} />
    );
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "example" } });
    expect(handleFilterChange).toHaveBeenCalledWith("example");
  });

  it("renders the filter button", () => {
    const wrapper = shallow(
      <FilterWrapper handleFilterChange={handleFilterChange} />
    );
    expect(wrapper.find("Button").length).toBe(1);
  });
});
