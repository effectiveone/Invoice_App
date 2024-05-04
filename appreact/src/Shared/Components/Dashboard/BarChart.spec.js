import React from "react";
import { render } from "@testing-library/react";
import { BarChart } from "./BarChart";
import i18next from "i18next";

describe("BarChart component", () => {
  beforeAll(() => {
    i18next.init({
      lng: "en",
      resources: {
        en: {
          translation: {
            salesByMonth: "Sales by month",
          },
        },
      },
    });
  });

  test("should render without errors", () => {
    const salesData = {
      name: "Test Sales Data",
      monthNames: { 0: "January", 1: "February", 2: "March" },
      values: [100, 200, 300],
    };
    const { getByTestId } = render(<BarChart salesData={salesData} />);
    const barChart = getByTestId("bar-chart");
    expect(barChart).toBeInTheDocument();
  });

  test("should receive correct props and pass them to ReactApexChart", () => {
    const salesData = {
      name: "Test Sales Data",
      monthNames: { 0: "January", 1: "February", 2: "March" },
      values: [100, 200, 300],
    };
    const { getByTestId } = render(<BarChart salesData={salesData} />);
    const apexChart = getByTestId("apex-chart");
    expect(apexChart.props.options.title.text).toBe("Test Sales Data");
    expect(apexChart.props.options.labels).toEqual([
      "January",
      "February",
      "March",
    ]);
    expect(
      apexChart.props.options.tooltip.custom({
        series: [[100, 200, 300]],
        seriesIndex: 0,
        dataPointIndex: 1,
      })
    ).toBe("<div>Sales by month February: 200</div>");
    expect(apexChart.props.series[0].name).toBe("Sales by month");
    expect(apexChart.props.series[0].data).toEqual([100, 200, 300]);
    expect(apexChart.props.type).toBe("bar");
    expect(apexChart.props.width).toBe(300);
  });

  test("should display tooltip with translated message", () => {
    const salesData = {
      name: "Test Sales Data",
      monthNames: { 0: "January", 1: "February", 2: "March" },
      values: [100, 200, 300],
    };
    const { getByTestId } = render(<BarChart salesData={salesData} />);
    const apexChart = getByTestId("apex-chart");
    expect(
      apexChart.props.options.tooltip.custom({
        series: [[100, 200, 300]],
        seriesIndex: 0,
        dataPointIndex: 1,
      })
    ).toBe("<div>Sales by month February: 200</div>");
  });
});
