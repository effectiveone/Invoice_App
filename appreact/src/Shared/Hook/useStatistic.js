import { useEffect } from 'react';
import { fetchStats } from '../../Store/Actions/statsActions';

import { useDispatch, useSelector } from 'react-redux';
import { useUser } from './useUser';
import { useTranslation } from 'react-i18next';

export const useStatistic = () => {
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.stats?.stats);
  const monthlySale = useSelector((state) => state.stats?.stats?.monthlySales);
  useEffect(() => {
    if (!stats?.length && currentUser) {
      dispatch(fetchStats(currentUser));
    }
  }, [currentUser, dispatch, stats?.length]);

  const years = stats?.years;

  const dataForYears = years?.map((year) => {
    const dataForYear = stats?.chartData.reduce((acc, cur) => {
      const data = cur[year];
      if (data) {
        Object.keys(data).forEach((key) => {
          acc[key] = [...(acc[key] || []), data[key]];
        });
      }
      return acc;
    }, {});

    const norm = Object.keys(dataForYear);
    const keys = norm?.map((key) => t(key));
    const flat = Object.values(dataForYear);
    const values = flat.map((innerArr) => innerArr[0]);

    return {
      year,
      keys,
      values,
    };
  });

  // months
  function transformData(monthlySale, years) {
    const result = {};
    for (const saleType in monthlySale) {
      result[saleType] = {};

      for (const year of years) {
        result[saleType][year] = {};

        for (let month = 1; month <= 12; month++) {
          const monthStr = String(month).padStart(2, '0');
          result[saleType][year][monthStr] =
            monthlySale[saleType][year]?.[monthStr] ?? 0;
        }
      }
    }
    return result;
  }

  const monthlySales = transformData(monthlySale, years);

  const yearlySalesByMonth = (date) => {
    const yearlySales = {};

    for (const key in date) {
      for (const year in date[key]) {
        if (!yearlySales[year]) {
          yearlySales[year] = [];
        }

        const values = [];
        for (let i = 1; i <= 12; i++) {
          const month = i.toString().padStart(2, '0');
          values.push(date[key][year][month] || 0);
        }
        const monthNames = {
          January: t('January'),
          February: t('February'),
          March: t('March'),
          April: t('April'),
          May: t('May'),
          June: t('June'),
          July: t('July'),
          August: t('August'),
          September: t('September'),
          October: t('October'),
          November: t('November'),
          December: t('December'),
        };
        yearlySales[year].push({
          name: t(key),
          monthNames: monthNames,
          values: values,
        });
      }
    }
    return {
      yearlySales,
    };
  };

  const salesByMonth = yearlySalesByMonth(monthlySales);

  return {
    stats,
    years,
    salesByMonth,
    monthlySales,
    dataForYears,
  };
};
