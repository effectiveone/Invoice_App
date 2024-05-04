import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LoginPage from "./LoginPage";

const mockStore = configureMockStore([thunk]);

describe("LoginPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      },
    });
  });

  test("should render all input fields and a button", () => {
    const { getByLabelText, getByRole } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });

  test("should update email and password input value on change", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("should show an error message if form fields are empty and button is clicked", () => {
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const loginButton = getByRole("button");

    fireEvent.click(loginButton);

    expect(
      getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
    expect(getByText("Please enter a valid password.")).toBeInTheDocument();
  });

  test("should dispatch login action on button click with valid form fields", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const loginButton = getByRole("button");

    fireEvent.change(getByLabelText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(loginButton);

    expect(store.getActions()).toEqual([{ type: "LOGIN_REQUEST" }]);
  });
});
