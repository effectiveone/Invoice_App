import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './Shared/Locales/en/translation.json';
import translationPL from './Shared/Locales/pl/translation.json';
import translationFR from './Shared/Locales/fr/translation.json';

// Konfiguracja i18n
i18n
  .use(initReactI18next) // dodanie initReactI18next jako plugin
  .init({
    lng: 'en', // język domyślny
    fallbackLng: 'en', // język awaryjny, który zostanie użyty, jeśli nie zostanie znaleziona tłumaczenie
    resources: {
      en: {
        translation: translationEN, // plik z tłumaczeniami dla języka angielskiego
      },
      pl: {
        translation: translationPL, // plik z tłumaczeniami dla języka polskiego
      },
      fr: {
        translation: translationFR, // plik z tłumaczeniami dla języka polskiego
      },
    },
    interpolation: {
      escapeValue: false, // zabezpieczenie przed XSS injection
    },
  });

export default i18n;
