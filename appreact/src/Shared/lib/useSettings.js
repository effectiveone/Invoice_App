import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from './useUser';
import {
  updateSettings,
  updateSettingsOptimistic,
} from '../../app/store/Actions/settingsActions';
import { openAlertMessage } from '../../app/store/Actions/alertActions';
import { US, PL, FR } from 'country-flag-icons/react/3x2';
import i18n from '../config/i18n';

export const useSettings = () => {
  const { currentUser } = useUser();
  const settings = useSelector((state) => state.settings.settings);

  const mySystemOfDesign = useSelector(
    (state) => state.settings.mySystemOfDesign,
  );

  const selectedDesign = settings?.designName;
  const dispatch = useDispatch();

  // Debug logging
  useEffect(() => {
    console.log('🎨 useSettings - Debug Info:', {
      selectedDesign,
      settings,
      mySystemOfDesign: mySystemOfDesign?.length,
      currentUser: currentUser?.mail,
    });
  }, [selectedDesign, settings, mySystemOfDesign, currentUser]);

  const handleThemeChange = (event) => {
    if (!currentUser) {
      console.error('❌ useSettings: Brak currentUser w handleThemeChange');
      dispatch(openAlertMessage('Błąd: Użytkownik nie jest zalogowany'));
      return;
    }

    const { value } = event.target;
    console.log('🔄 useSettings - Zmiana motywu:', {
      newTheme: value,
      oldTheme: selectedDesign,
      userEmail: currentUser?.mail,
    });

    dispatch(
      updateSettings(
        {
          designName: value,
          email: currentUser?.mail,
        },
        currentUser,
      ),
    );
  };

  const handleChange = (e) => {
    if (!currentUser) {
      dispatch(openAlertMessage('Błąd: Użytkownik nie jest zalogowany'));
      return;
    }
    const selectedDesign = mySystemOfDesign.find(
      (design) => design.name === e.target.value,
    );
    dispatch(
      updateSettings(
        {
          designName: selectedDesign.name,
          email: currentUser?.mail,
        },
        currentUser,
      ),
    );
  };

  // Language settings - ULEPSZONA IMPLEMENTACJA z optimistic updates
  const selectedSettings = settings?.lang;

  // Opcje języków
  const options = useMemo(
    () => [
      { value: 'en', label: 'English', icon: <US /> },
      { value: 'pl', label: 'Polski', icon: <PL /> },
      { value: 'fr', label: 'Français', icon: <FR /> },
    ],
    [],
  );

  // Stan lokalny tylko dla UI (dropdown) - synchronizowany z Redux
  const [isOpen, setIsOpen] = useState(false);

  // Obecny wybór na podstawie Redux store
  const currentLanguage = selectedSettings || 'en';
  const selectedOption = useMemo(() => {
    return (
      options.find((option) => option.value === currentLanguage) || options[0]
    );
  }, [options, currentLanguage]);

  // Synchronizacja i18n z Redux store
  useEffect(() => {
    console.log('🌐 useSettings - Language sync:', {
      reduxLang: selectedSettings,
      currentLanguage,
      i18nLanguage: i18n.language,
    });

    // Aktualizuj i18n tylko jeśli język się różni
    if (currentLanguage !== i18n.language) {
      console.log(
        '🔄 useSettings - Synchronizing i18n language to:',
        currentLanguage,
      );
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, selectedSettings]);

  // ULEPSZONA FUNKCJA ZMIANY JĘZYKA z optimistic updates
  const handleLang = useCallback(
    async (newLang) => {
      console.log('📝 useSettings - handleLang called with:', newLang);

      if (!currentUser) {
        console.error('❌ useSettings: Brak currentUser w handleLang');
        dispatch(openAlertMessage('Błąd: Użytkownik nie jest zalogowany'));
        return;
      }

      // Sprawdź czy język jest inny
      if (newLang === currentLanguage) {
        console.log('🌐 useSettings - Same language, skipping update');
        return;
      }

      const previousLanguage = currentLanguage;
      const languageLabel =
        options.find((opt) => opt.value === newLang)?.label || newLang;

      try {
        // 1. OPTIMISTIC UPDATE - natychmiast aktualizujemy Redux store
        console.log('🚀 useSettings - Optimistic Redux update to:', newLang);
        dispatch(updateSettingsOptimistic({ lang: newLang }));

        // 2. Natychmiast zmieniamy język w i18n
        console.log('🚀 useSettings - Optimistic i18n update to:', newLang);
        i18n.changeLanguage(newLang);

        // 3. Pokazujemy powiadomienie o zmianie
        dispatch(openAlertMessage(`Zmieniono język na: ${languageLabel}`));

        // 4. Zapisujemy w backend (bez wpływu na UI)
        await dispatch(
          updateSettings(
            {
              lang: newLang,
              email: currentUser?.mail,
            },
            currentUser,
          ),
        );

        console.log(
          '✅ useSettings - Language successfully saved to backend:',
          newLang,
        );
      } catch (error) {
        console.error(
          '❌ useSettings - Error saving language to backend:',
          error,
        );

        // W przypadku błędu, przywracamy poprzedni język w Redux i i18n
        console.log(
          '🔄 useSettings - Reverting language to:',
          previousLanguage,
        );
        dispatch(updateSettingsOptimistic({ lang: previousLanguage }));
        i18n.changeLanguage(previousLanguage);

        // Pokazujemy powiadomienie o błędzie
        dispatch(
          openAlertMessage(
            'Wystąpił błąd podczas zapisywania języka. Zmiana została cofnięta.',
          ),
        );
      }
    },
    [currentUser, dispatch, currentLanguage, options],
  );

  const toggleOptions = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const setSelectedOption = useCallback(
    (option) => {
      // Ta funkcja nie jest już potrzebna, ale pozostawiam dla kompatybilności
      handleLang(option.value);
    },
    [handleLang],
  );

  return {
    // Language API
    handleLang,
    language: currentLanguage,
    options,
    selectedOption,
    setSelectedOption,
    isOpen,
    setIsOpen,
    toggleOptions,

    // Theme API
    mySystemOfDesign,
    handleThemeChange,
    selectedDesign,
    handleChange,
  };
};
