import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import i18n from '../../shared/config/i18n';

export const I18nProvider = ({ children }) => {
  const settings = useSelector((state) => state.settings.settings);

  // Inicjalizacja języka przy ładowaniu aplikacji
  useEffect(() => {
    const initializeLanguage = () => {
      // Priorytet: ustawienia użytkownika > localStorage > domyślny 'en'
      const userLang = settings?.lang;
      const storedLang = localStorage.getItem('i18nextLng');
      const defaultLang = 'en';

      const languageToUse = userLang || storedLang || defaultLang;

      console.log('🌐 I18nProvider - Initializing language:', {
        userLang,
        storedLang,
        languageToUse,
        currentI18nLang: i18n.language,
      });

      // Ustaw język tylko jeśli jest inny niż obecny
      if (languageToUse && languageToUse !== i18n.language) {
        console.log('🔄 I18nProvider - Setting language to:', languageToUse);
        i18n.changeLanguage(languageToUse);
      }
    };

    initializeLanguage();
  }, [settings?.lang]);

  // Globalny listener dla zmian języka
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      console.log('🌐 I18nProvider - Language changed globally to:', lng);
      document.documentElement.lang = lng;
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: lng }));
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return <>{children}</>;
};
