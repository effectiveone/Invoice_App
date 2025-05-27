import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dashboard } from './Dashboard';
import { useStatisticContext } from '../../model/useStatisticContext';
import i18next from 'i18next';

jest.mock('../../model/useStatisticContext');
jest.mock('./TotalYearsChart', () => ({
  TotalYearsChart: () => (
    <div data-testid='total-years-chart'>TotalYearsChart</div>
  ),
}));
jest.mock('./MontlyChart', () => ({
  MontlyChart: () => <div data-testid='monthly-chart'>MontlyChart</div>,
}));
jest.mock('./jpkTable', () => ({
  __esModule: true,
  default: () => <div data-testid='jpk-table'>JpkTable</div>,
}));

describe('Dashboard component', () => {
  beforeAll(() => {
    i18next.init({
      lng: 'pl',
      resources: {
        pl: {
          translation: {
            noStatisticData: 'Brak danych statystycznych',
            noStatisticDate: 'Brak danych statystycznych do wyświetlenia',
          },
        },
      },
    });
  });

  test("should display 'Ładowanie danych...' text when years are not available", () => {
    useStatisticContext.mockReturnValue({ years: null });
    const { getByText } = render(<Dashboard />);
    expect(getByText('Ładowanie danych...')).toBeInTheDocument();
  });

  test('should display TotalYearsChart and MontlyChart when years are available', () => {
    useStatisticContext.mockReturnValue({ years: [2020, 2021] });
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId('total-years-chart')).toBeInTheDocument();
    expect(getByTestId('monthly-chart')).toBeInTheDocument();
  });

  test("should display 'Brak danych statystycznych' text when years are empty", () => {
    useStatisticContext.mockReturnValue({ years: [] });
    const { getByText } = render(<Dashboard />);
    expect(getByText('Brak danych statystycznych')).toBeInTheDocument();
  });
});
