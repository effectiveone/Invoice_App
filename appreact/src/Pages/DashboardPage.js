import React from 'react';
import Layout from '../shared/ui/Layout/layout';
import { StatisticProvider } from '../features/dashboard/model/useStatisticContext';
import Dashboard from '../features/dashboard/ui/Dashboard';

const DashboardPage = () => {
  return (
    <StatisticProvider>
      <Dashboard />
    </StatisticProvider>
  );
};

export default Layout(DashboardPage);
