import React from "react";
import { render } from "@testing-library/react";
import { LineChart } from "./LineChart";
import i18next from "i18next";

describe("LineChart component", () => {
  beforeAll(() => {
    i18next.init({
      lng: "en",
      resources: {
        en: {
          translation: {
            salesByYear: "Sales by year",
            chartByYear: "Chart by year",
          },
        },
      },
    });
  });

  test("should render without errors", () => {
    const chartsToDisplay = [
      {
        year: 2020,
        keys: ["January", "February", "March"],
        values: [100, 200, 300],
      },
      {
        year: 2021,
        keys: ["April", "May", "June"],
        values: [400, 500, 600],
      },
    ];
    const { getByTestId } = render(
      <LineChart chartsToDisplay={chartsToDisplay} />
    );
    const lineChart = getByTestId("line-chart");
    expect(lineChart).toBeInTheDocument();
  });

  test("should display correct chart titles", () => {
    const chartsToDisplay = [
      {
        year: 2020,
        keys: ["January", "February", "March"],
        values: [100, 200, 300],
      },
      {
        year: 2021,
        keys: ["April", "May", "June"],
        values: [400, 500, 600],
      },
    ];
    const { getByText } = render(
      <LineChart chartsToDisplay={chartsToDisplay} />
    );
    expect(getByText("Sales by year")).toBeInTheDocument();
    expect(getByText("Chart by year 2020")).toBeInTheDocument();
    expect(getByText("Chart by year 2021")).toBeInTheDocument();
  });

  test("should display correct chart labels and data", () => {
    const chartsToDisplay = [
      {
        year: 2020,
        keys: ["January", "February", "March"],
        values: [100, 200, 300],
      },
      {
        year: 2021,
        keys: ["April", "May", "June"],
        values: [400, 500, 600],
      },
    ];
    const { getByTestId } = render(
      <LineChart chartsToDisplay={chartsToDisplay} />
    );
    const chart1 = getByTestId("line-chart-0");
    expect(chart1.props.options.title.text).toBe("Chart by year 2020");
    expect(chart1.props.options.labels).toEqual([
      "January",
      "February",
      "March",
    ]);
    expect(chart1.props.series).toEqual([100, 200, 300]);
    const chart2 = getByTestId("line-chart-1");
    expect(chart2.props.options.title.text).toBe("Chart by year 2021");
    expect(chart2.props.options.labels).toEqual(["April", "May", "June"]);
    expect(chart2.props.series).toEqual([400, 500, 600]);
  });

  it("should render without errors", () => {
    const chartsToDisplay = [
      {
        year: 2020,
        keys: ["Product A", "Product B", "Product C"],
        values: [44, 55, 41],
      },
      {
        year: 2019,
        keys: ["Product A", "Product B", "Product C"],
        values: [53, 32, 33],
      },
    ];

    const { getByTestId } = render(
      <LineChart chartsToDisplay={chartsToDisplay} />
    );
    const mockChart = getByTestId("mock-chart");
    expect(mockChart).toBeInTheDocument();
  });
});
