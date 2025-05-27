import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import DashboardPage from '../../pages/DashboardPage';
import InventoryPage from '../../pages/EnhancedInventoryPage';
import IssuedInvoicePage from '../../pages/EnhancedIssuedInvoicePage';
import NewInvoicePage from '../../pages/NewInvoicePage';
import KontrahentPage from '../../pages/EnhancedKontrahentPage';
import SettingsPage from '../../pages/SettingsPage';
import MyCompanyPage from '../../pages/MyCompanyPage';

// Auth pages
import LoginPage from '../../features/auth/ui/LoginPage/LoginPage';
import RegisterPage from '../../features/auth/ui/RegisterPage/RegisterPage';

// Shared components
import ExampleUsage from '../../shared/ui/DataTable/ExampleUsage';

export const AppRoutes = ({ currentUser }) => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      {currentUser ? (
        <>
          <Route path='/Dashboard' element={<DashboardPage />} />
          <Route path='/Inventory' element={<InventoryPage />} />
          <Route path='/InvoicesIssued' element={<IssuedInvoicePage />} />
          <Route path='/NewInvoice' element={<NewInvoicePage />} />
          <Route path='/Kontrahent' element={<KontrahentPage />} />
          <Route path='/SettingsPage' element={<SettingsPage />} />
          <Route path='/Mycompany' element={<MyCompanyPage />} />
          <Route path='/DataTableExample' element={<ExampleUsage />} />
          <Route path='/' element={<Navigate to='/SettingsPage' />} />
        </>
      ) : (
        <Route path='/' element={<LoginPage />} />
      )}
      <Route
        path='/'
        element={currentUser ? <Navigate to='/SettingsPage' /> : <LoginPage />}
      />
    </Routes>
  );
};
