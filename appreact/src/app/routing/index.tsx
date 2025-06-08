import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import type { User } from '../../types/common';

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

interface AppRoutesProps {
  currentUser: User | null;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({
  currentUser,
}): JSX.Element => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      {currentUser ? (
        <>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/produkty' element={<InventoryPage />} />
          <Route path='/faktury' element={<IssuedInvoicePage />} />
          <Route path='/nowa-faktura' element={<NewInvoicePage />} />
          <Route path='/kontrahenci' element={<KontrahentPage />} />
          <Route path='/ustawienia' element={<SettingsPage />} />
          <Route path='/moja-firma' element={<MyCompanyPage />} />
          <Route path='/DataTableExample' element={<ExampleUsage />} />

          {/* Backward compatibility - stare ścieżki */}
          <Route path='/Dashboard' element={<Navigate to='/dashboard' />} />
          <Route path='/Inventory' element={<Navigate to='/produkty' />} />
          <Route path='/InvoicesIssued' element={<Navigate to='/faktury' />} />
          <Route path='/NewInvoice' element={<Navigate to='/nowa-faktura' />} />
          <Route path='/Kontrahent' element={<Navigate to='/kontrahenci' />} />
          <Route path='/SettingsPage' element={<Navigate to='/ustawienia' />} />
          <Route path='/Mycompany' element={<Navigate to='/moja-firma' />} />

          <Route path='/' element={<Navigate to='/dashboard' />} />
        </>
      ) : (
        <Route path='/' element={<LoginPage />} />
      )}
      <Route
        path='/'
        element={currentUser ? <Navigate to='/dashboard' /> : <LoginPage />}
      />
    </Routes>
  );
};
