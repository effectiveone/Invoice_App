import { createContext, useContext } from "react";
import { useStatistic } from "../Hook/useStatistic";
import { useJPK } from "../Hook/useJPK";

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
