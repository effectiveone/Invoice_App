import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import i18n from '../../shared/config/i18n';

interface I18nProviderProps {}

interface SettingsState {
  lang?: string;
}

interface ReduxState {
  settings: {
    settings: SettingsState;
  };
}

export const I18nProvider: React.FC<
  React.PropsWithChildren<I18nProviderProps>
> = ({ children }): JSX.Element => {
  const settings: SettingsState = useSelector(
    (state: ReduxState) => state.settings.settings,
  );

  // Inicjalizacja języka przy ładowaniu aplikacji
  useEffect((): void => {
    const initializeLanguage = (): void => {
      // Priorytet: ustawienia użytkownika > localStorage > domyślny 'en'
      const userLang: string | undefined = settings?.lang;
      const storedLang: string | null = localStorage.getItem('i18nextLng');
      const defaultLang: string = 'en';

      const languageToUse: string = userLang || storedLang || defaultLang;

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
  useEffect((): (() => void) => {
    const handleLanguageChange = (lng: string): void => {
      console.log('🌐 I18nProvider - Language changed globally to:', lng);
      document.documentElement.lang = lng;
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: lng }));
    };

    i18n.on('languageChanged', handleLanguageChange);

    return (): void => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return <>{children}</>;
};
