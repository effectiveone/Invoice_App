import React from "react";
import Layout from "../Shared/Components/Layout/layout";
import { StatisticProvider } from "../Shared/Context/useStatisticContext";
import Dashboard from "../Shared/Components/Dashboard";

const DashboardPage = () => {
  return (
    <StatisticProvider>
      <Dashboard />
    </StatisticProvider>
  );
};

export default Layout(DashboardPage);
