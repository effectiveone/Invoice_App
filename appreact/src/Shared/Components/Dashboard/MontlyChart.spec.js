import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MontlyChart } from "./MontlyChart";
import { useStatisticContext } from "../../Context/useStatisticContext";
import { usePagination } from "../../Hook/usePagination";
import { BarChart } from "./BarChart";
import i18next from "i18next";

jest.mock("../../Context/useStatisticContext");
jest.mock("../../Hook/usePagination");

describe("MonthlyChart component", () => {
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
    useStatisticContext.mockReturnValue({ salesByMonth: { yearlySales: {} } });
    usePagination.mockReturnValue({
      currentPage: 1,
      startIndex: 0,
      endIndex: 5,
      pageSize: 5,
      handleChangePage: jest.fn(),
    });
    const { getByTestId } = render(<MontlyChart />);
    const monthlyChart = getByTestId("monthly-chart");
    expect(monthlyChart).toBeInTheDocument();
  });

  test("should display sales by year and sales by month for each year", () => {
    useStatisticContext.mockReturnValue({
      salesByMonth: {
        yearlySales: {
          2021: [
            {
              name: "Product A",
              monthNames: {
                0: "January",
                1: "February",
                2: "March",
              },
              values: [100, 200, 300],
            },
            {
              name: "Product B",
              monthNames: {
                0: "January",
                1: "February",
                2: "March",
              },
              values: [400, 500, 600],
            },
          ],
          2020: [
            {
              name: "Product A",
              monthNames: {
                0: "January",
                1: "February",
                2: "March",
              },
              values: [700, 800, 900],
            },
          ],
        },
      },
    });
    usePagination.mockReturnValue({
      currentPage: 1,
      startIndex: 0,
      endIndex: 2,
      pageSize: 2,
      handleChangePage: jest.fn(),
    });
    const { getByText } = render(<MontlyChart />);
    expect(getByText("Sales by month 2021")).toBeInTheDocument();
    expect(getByText("Product A")).toBeInTheDocument();
    expect(getByText("Product B")).toBeInTheDocument();
    expect(getByText("Sales by month 2020")).toBeInTheDocument();
    expect(getByText("Product A")).toBeInTheDocument();
  });

  test("should display correct number of BarChart components", () => {
    useStatisticContext.mockReturnValue({
      salesByMonth: {
        yearlySales: {
          2021: [
            {
              name: "Product A",
              monthNames: {
                0: "January",
                1: "February",
                2: "March",
              },
              values: [100, 200, 300],
            },
            {
              name: "Product B",
              monthNames: {
                0: "January",
                1: "February",
                2: "March",
              },
              values: [400, 500, 600],
            },
          ],
          2020: [
            {
              name: "Product A",
              monthNames: {
                0: "January",
                1: "February",
                2: "March",
              },
              values: [700, 800, 900],
            },
          ],
        },
      },
    });
    usePagination.mockReturnValue({
      currentPage: 1,
      startIndex: 0,
      endIndex: 2,
      pageSize: 2,
      handleChangePage: jest.fn(),
    });
    const { getAllByTestId } = render(<MontlyChart />);
    const barCharts = getAllByTestId("bar-chart");
    expect(barCharts.length).toBe(2);
  });

  test("should handle pagination changes", () => {
    const handleChangePage = jest.fn();
    useStatisticContext.mockReturnValue({
      salesByMonth: {
        yearlySales: {
          2021: [
            {
              name: "Product A",
              monthNames: {
                0: "January",
                1: "February",
                2: "March",
              },
              values: [100, 200, 300],
            },
            {
              name: "Product B",
              monthNames: {
                0: "January",
                1: "February",
                2: "March",
              },
              values: [400, 500, 600],
            },
          ],
          2020: [
            {
              name: "Product A",
              monthNames: {
                0: "January",
                1: "February",
                2: "March",
              },
              values: [700, 800, 900],
            },
          ],
        },
      },
    });
    usePagination.mockReturnValue({
      currentPage: 1,
      startIndex: 0,
      endIndex: 2,
      pageSize: 2,
      handleChangePage,
    });
    const { getByLabelText } = render(<MontlyChart />);
    const nextButton = getByLabelText("Go to next page");
    fireEvent.click(nextButton);
    expect(handleChangePage).toHaveBeenCalledWith(2);
  });
});
