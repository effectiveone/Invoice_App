import { useEffect, useState } from 'react';
import i18n from '../config/i18n';

interface UseLanguageListenerReturn {
  currentLanguage: string;
  isLanguageReady: boolean;
}

/**
 * Hook który wymusza re-render komponentów przy zmianie języka i18n
 * Użyj tego hooka w komponentach które używają tłumaczeń ale nie reagują na zmiany
 */
export const useLanguageListener = (): UseLanguageListenerReturn => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng: string): void => {
      console.log('🔄 useLanguageListener - Language changed to:', lng);
      setCurrentLanguage(lng);
    };

    // Nasłuchuj na zmiany języka w i18n
    i18n.on('languageChanged', handleLanguageChange);

    // Nasłuchuj również na custom event z App.tsx
    const handleCustomLanguageChange = (event: CustomEvent<string>): void => {
      console.log(
        '🔄 useLanguageListener - Custom language event:',
        event.detail,
      );
      setCurrentLanguage(event.detail);
    };

    window.addEventListener(
      'languageChanged',
      handleCustomLanguageChange as EventListener,
    );

    // Cleanup
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      window.removeEventListener(
        'languageChanged',
        handleCustomLanguageChange as EventListener,
      );
    };
  }, []);

  return {
    currentLanguage,
    isLanguageReady: !!currentLanguage,
  };
};

export default useLanguageListener;
