import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './Auth/LoginPage/LoginPage.js';
import RegisterPage from './Auth/RegisterPage/RegisterPage.js';
import EnhancedIssuedInvoicePage from './Pages/EnhancedIssuedInvoicePage.js';
import MyCompanyPage from './Pages/MyCompanyPage.js';
import DashboardPage from './Pages/DashboardPage.js';
import NewInvoicePage from './Pages/NewInvoicePage.js';
import EnhancedInventoryPage from './Pages/EnhancedInventoryPage.js';
import EnhancedKontrahentPage from './Pages/EnhancedKontrahentPage.js';
import SettingsPage from './Pages/SettingsPage.js';
import ExampleUsage from './Shared/Components/DataTable/ExampleUsage.js';
import { useUser } from './Shared/Hook/useUser.js';
import { useSelector } from 'react-redux';
import AlertNotification from './Shared/Components/AlertNotification.js';
import i18n from './i18n';
import './App.css';

function App() {
  const { currentUser } = useUser();
  const settings = useSelector((state) => state.settings.settings);

  // Inicjalizacja języka przy ładowaniu aplikacji
  useEffect(() => {
    const initializeLanguage = () => {
      // Priorytet: ustawienia użytkownika > localStorage > domyślny 'en'
      const userLang = settings?.lang;
      const storedLang = localStorage.getItem('i18nextLng');
      const defaultLang = 'en';

      const languageToUse = userLang || storedLang || defaultLang;

      console.log('🌐 App - Initializing language:', {
        userLang,
        storedLang,
        languageToUse,
        currentI18nLang: i18n.language,
      });

      // Ustaw język tylko jeśli jest inny niż obecny
      if (languageToUse && languageToUse !== i18n.language) {
        console.log('🔄 App - Setting language to:', languageToUse);
        i18n.changeLanguage(languageToUse);
      }
    };

    initializeLanguage();
  }, [settings?.lang]);

  // 🔥 GLOBALNY LISTENER dla zmian języka - naprawia problem z odświeżaniem
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      console.log('🌐 App - Language changed globally to:', lng);
      // To wydarzenie wymusi re-render wszystkich komponentów używających useTranslation
      document.documentElement.lang = lng;

      // Opcjonalnie można dodać force update dla bardzo opornych komponentów
      // To może być przydatne dla komponentów które nie używają hooków react-i18next
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: lng }));
    };

    // Subskrybuj zmiany języka
    i18n.on('languageChanged', handleLanguageChange);

    // Cleanup przy unmount
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {currentUser ? (
            <>
              <Route path='/Dashboard' element={<DashboardPage />} />
              <Route path='/Inventory' element={<EnhancedInventoryPage />} />
              <Route
                path='/InvoicesIssued'
                element={<EnhancedIssuedInvoicePage />}
              />
              <Route path='/NewInvoice' element={<NewInvoicePage />} />
              <Route path='/Kontrahent' element={<EnhancedKontrahentPage />} />
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
