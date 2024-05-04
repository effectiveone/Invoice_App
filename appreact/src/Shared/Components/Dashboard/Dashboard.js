import React from "react";
import { TotalYearsChart } from "./TotalYearsChart";
import { MontlyChart } from "./MontlyChart";
import { useStatisticContext } from "../../Context/useStatisticContext";
import { t } from "i18next";
import JpkTable from "./jpkTable";

export const Dashboard = () => {
  const { years } = useStatisticContext();
  if (!years) return "Loading...";
  return (
    <>
      {years?.length !== 0 && (
        <>
          <TotalYearsChart />
          <MontlyChart />
          <JpkTable />
        </>
      )}
      {years?.length === 0 && `${t("noStatisticDate")}`}
    </>
  );
};
