import React, { createContext, useContext, ReactNode } from 'react';
import { useStatistic } from '../../../shared/lib/useStatistic';
import { useJPK } from '../../../shared/lib/useJPK';

interface StatisticContextType {
  [key: string]: any;
}

interface StatisticProviderProps {
  children: ReactNode;
}

const StatisticContext = createContext<StatisticContextType | undefined>(
  undefined,
);

export const useStatisticContext = (): StatisticContextType => {
  const context = useContext(StatisticContext);
  if (!context) {
    throw new Error(
      'useStatisticContext must be used within StatisticProvider',
    );
  }
  return context;
};

export const StatisticProvider: React.FC<StatisticProviderProps> = ({
  children,
}) => {
  const Statistic = useStatistic();
  const JPK = useJPK();
  const contextValue = {
    ...Statistic,
    ...JPK,
  };

  return (
    <StatisticContext.Provider value={contextValue}>
      {children}
    </StatisticContext.Provider>
  );
};

export default StatisticProvider;
