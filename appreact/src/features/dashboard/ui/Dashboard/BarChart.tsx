import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { useLanguageListener } from '../../../../shared/lib/useLanguageListener';

export const BarChart = ({ salesData }) => {
  const { t } = useTranslation();

  // 🔥 Hook który wymusza re-render przy zmianie języka
  const { currentLanguage } = useLanguageListener();

  return (
    <ReactApexChart
      options={{
        chart: {
          type: 'bar',
        },
        labels: Object.values(salesData.monthNames),
        title: {
          text: ` ${salesData.name}`,
        },
        tooltip: {
          custom: ({ series, seriesIndex, dataPointIndex }) => {
            const monthName = Object.values(salesData.monthNames)[
              dataPointIndex
            ];
            const value = series[seriesIndex][dataPointIndex];
            return `<div>${t('salesByMonth')} ${monthName}: ${value}</div>`;
          },
        },
      }}
      series={[
        {
          name: t('salesByMonth'),
          data: salesData.values,
        },
      ]}
      type='bar'
      width={300}
    />
  );
};
