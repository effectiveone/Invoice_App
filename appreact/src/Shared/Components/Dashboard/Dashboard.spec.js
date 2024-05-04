import React from "react";
import { render } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { useStatisticContext } from "../../Context/useStatisticContext";
import i18next from "i18next";

jest.mock("../../Context/useStatisticContext");

describe("Dashboard component", () => {
  beforeAll(() => {
    i18next.init({
      lng: "pl",
      resources: {
        pl: {
          translation: {
            noStatisticData: "Brak danych statystycznych",
          },
        },
      },
    });
  });

  test("should display 'Loading...' text when years are not available", () => {
    useStatisticContext.mockReturnValue({ years: null });
    const { getByText } = render(<Dashboard />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("should display TotalYearsChart and MontlyChart when years are available", () => {
    useStatisticContext.mockReturnValue({ years: [2020, 2021] });
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId("total-years-chart")).toBeInTheDocument();
    expect(getByTestId("monthly-chart")).toBeInTheDocument();
  });

  test("should display 'Brak danych statystycznych' text when years are empty", () => {
    useStatisticContext.mockReturnValue({ years: [] });
    const { getByText } = render(<Dashboard />);
    expect(getByText("Brak danych statystycznych")).toBeInTheDocument();
  });
});
