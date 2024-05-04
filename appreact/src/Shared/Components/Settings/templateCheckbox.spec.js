import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import TemplateCheckbox from "./TemplateCheckbox";

const mockStore = configureMockStore();

describe("TemplateCheckbox component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      template: {
        selectedOption: "basicInput",
      },
    });
  });

  it("should render the component with basic input option selected", () => {
    render(
      <Provider store={store}>
        <TemplateCheckbox />
      </Provider>
    );

    const basicInputRadio = screen.getByRole("radio", {
      name: "Basic Input",
    });
    const mediumInputRadio = screen.getByRole("radio", {
      name: "Medium Input",
    });
    const printerInputRadio = screen.getByRole("radio", {
      name: "Printer Input",
    });

    expect(basicInputRadio.checked).toBe(true);
    expect(mediumInputRadio.checked).toBe(false);
    expect(printerInputRadio.checked).toBe(false);
  });

  it("should select a different option when a radio button is clicked", () => {
    render(
      <Provider store={store}>
        <TemplateCheckbox />
      </Provider>
    );

    const mediumInputRadio = screen.getByRole("radio", {
      name: "Medium Input",
    });

    fireEvent.click(mediumInputRadio);

    expect(mediumInputRadio.checked).toBe(true);
    expect(store.getActions()).toEqual([selectOption("mediumInput")]);
  });

  it("should dispatch toggleCheckbox action when radio button is clicked", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <TemplateCheckbox />
      </Provider>
    );

    const printerInputRadio = screen.getByRole("radio", {
      name: "Printer Input",
    });

    fireEvent.click(printerInputRadio);

    expect(store.dispatch).toHaveBeenCalledWith(selectOption("printerInput"));
  });
});
