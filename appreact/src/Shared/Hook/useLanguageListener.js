import { useEffect, useState } from 'react';
import i18n from '../../i18n';

/**
 * Hook który wymusza re-render komponentów przy zmianie języka i18n
 * Użyj tego hooka w komponentach które używają tłumaczeń ale nie reagują na zmiany
 */
export const useLanguageListener = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      console.log('🔄 useLanguageListener - Language changed to:', lng);
      setCurrentLanguage(lng);
    };

    // Nasłuchuj na zmiany języka w i18n
    i18n.on('languageChanged', handleLanguageChange);

    // Nasłuchuj również na custom event z App.js
    const handleCustomLanguageChange = (event) => {
      console.log(
        '🔄 useLanguageListener - Custom language event:',
        event.detail,
      );
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleCustomLanguageChange);

    // Cleanup
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      window.removeEventListener('languageChanged', handleCustomLanguageChange);
    };
  }, []);

  return {
    currentLanguage,
    isLanguageReady: !!currentLanguage,
  };
};
