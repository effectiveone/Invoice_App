import { createContext, useContext } from "react";
import { useStatistic } from "../../../shared/lib/useStatistic";
import { useJPK } from "../../../shared/lib/useJPK";

const StatisticContext = createContext();

export const useStatisticContext = () => useContext(StatisticContext);

export const StatisticProvider = ({ children }) => {
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
