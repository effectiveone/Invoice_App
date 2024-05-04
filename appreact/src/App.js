import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './Auth/LoginPage/LoginPage.js';
import RegisterPage from './Auth/RegisterPage/RegisterPage.js';
import IssuedInvoicePage from './Pages/IssuedInvoicePage.js';
import MyCompanyPage from './Pages/MyCompanyPage.js';
import DashboardPage from './Pages/DashboardPage.js';

import NewInvoicePage from './Pages/NewInvoicePage.js';
import InventoryPage from './Pages/InventoryPage.js';
import KontrahentPage from './Pages/KontrahentPage.js';
import SettingsPage from './Pages/SettingsPage.js';
import { useUser } from './Shared/Hook/useUser.js';
import AlertNotification from './Shared/Components/AlertNotification.js';
import './App.css';

function App() {
  const { currentUser } = useUser();

  return (
    <>
      <Router>
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
              <Route path='/' element={<Navigate to='/SettingsPage' />} />
            </>
          ) : (
            <Route path='/' element={<LoginPage />} />
          )}
          <Route
            path='/'
            element={
              currentUser ? <Navigate to='/SettingsPage' /> : <LoginPage />
            }
          />
        </Routes>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
