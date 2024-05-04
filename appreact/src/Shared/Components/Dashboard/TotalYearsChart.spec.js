import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useStatisticContext } from "../../Context/useStatisticContext";
import { TotalYearsChart } from "./TotalYearsChart";
import { LineChart } from "./LineChart";
import { usePagination } from "../../Hook/usePagination";
import i18next from "i18next";

jest.mock("../../Context/useStatisticContext");
jest.mock("./LineChart");
jest.mock("../../Hook/usePagination");

describe("TotalYearsChart component", () => {
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
    useStatisticContext.mockReturnValue({ dataForYears: [] });
    usePagination.mockReturnValue({
      currentPage: 1,
      startIndex: 0,
      endIndex: 5,
      pageSize: 5,
      handleChangePage: jest.fn(),
    });
    LineChart.mockImplementation(() => <div data-testid="line-chart" />);
    const { getByTestId } = render(<TotalYearsChart />);
    const totalYearsChart = getByTestId("total-years-chart");
    expect(totalYearsChart).toBeInTheDocument();
  });

  test("should display correct number of LineChart components", () => {
    useStatisticContext.mockReturnValue({
      dataForYears: [
        {
          year: 2021,
          keys: ["Product A", "Product B"],
          values: [100, 200],
        },
        {
          year: 2020,
          keys: ["Product A"],
          values: [300],
        },
      ],
    });
    usePagination.mockReturnValue({
      currentPage: 1,
      startIndex: 0,
      endIndex: 1,
      pageSize: 1,
      handleChangePage: jest.fn(),
    });
    LineChart.mockImplementation(() => <div data-testid="line-chart" />);
    const { getAllByTestId } = render(<TotalYearsChart />);
    const lineCharts = getAllByTestId("line-chart");
    expect(lineCharts.length).toBe(1);
  });

  test("should handle pagination changes", () => {
    const handleChangePage = jest.fn();
    useStatisticContext.mockReturnValue({ dataForYears: [] });
    usePagination.mockReturnValue({
      currentPage: 1,
      startIndex: 0,
      endIndex: 5,
      pageSize: 5,
      handleChangePage,
    });
    LineChart.mockImplementation(() => <div data-testid="line-chart" />);
    const { getByLabelText } = render(<TotalYearsChart />);
    const nextButton = getByLabelText("Go to next page");
    fireEvent.click(nextButton);
    expect(handleChangePage).toHaveBeenCalledWith(2);
  });
});
