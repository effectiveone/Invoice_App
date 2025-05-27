import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useTemplateConfig = () => {
  const [templateConfigs, setTemplateConfigs] = useState([]);
  const [currentTemplateConfig, setCurrentTemplateConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pobierz token z Redux lub localStorage
  const reduxToken = useSelector((state) => state.auth?.userDetails?.token);
  const localUser = JSON.parse(localStorage.getItem('user') || 'null');
  const authToken = reduxToken || localUser?.token;

  // Pobierz konfiguracje szablonów z serwera
  const fetchTemplateConfigs = useCallback(async () => {
    if (!authToken) {
      console.warn('Brak tokenu autoryzacji');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'http://localhost:50./api/template-configs',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setTemplateConfigs(data.templateConfigs || []);

        // Znajdź domyślny szablon
        const defaultTemplate = data.templateConfigs?.find(
          (config) => config.isDefault,
        );
        setCurrentTemplateConfig(
          defaultTemplate || data.templateConfigs?.[0] || null,
        );
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Błąd podczas pobierania konfiguracji szablonów',
        );
      }
    } catch (err) {
      setError(err.message);
      console.error('Błąd podczas pobierania konfiguracji:', err);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  // Zapisz konfigurację szablonu
  const saveTemplateConfig = async (configData) => {
    if (!authToken) {
      throw new Error('Nie jesteś zalogowany');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'http://localhost:50./api/save-template-config',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(configData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        await fetchTemplateConfigs(); // Odśwież listę
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Błąd podczas zapisywania konfiguracji',
        );
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Prześlij logo
  const uploadLogo = async (file) => {
    if (!authToken) {
      throw new Error('Nie jesteś zalogowany');
    }

    if (!file) {
      throw new Error('Nie wybrano pliku');
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await fetch('http://localhost:50./api/upload-logo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd podczas przesyłania logo');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Ustaw szablon jako domyślny
  const setDefaultTemplate = async (templateId) => {
    if (!authToken) {
      throw new Error('Nie jesteś zalogowany');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:50./api/template-configs/${templateId}/set-default`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        await fetchTemplateConfigs(); // Odśwież listę
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Błąd podczas ustawiania domyślnego szablonu',
        );
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Usuń konfigurację szablonu
  const deleteTemplateConfig = async (templateId) => {
    if (!authToken) {
      throw new Error('Nie jesteś zalogowany');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:50./api/template-configs/${templateId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        await fetchTemplateConfigs(); // Odśwież listę
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Błąd podczas usuwania konfiguracji',
        );
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Pobierz podgląd szablonu
  const getTemplatePreview = async (templateId) => {
    if (!authToken) {
      throw new Error('Nie jesteś zalogowany');
    }

    try {
      const response = await fetch(
        `http://localhost:50./api/template-preview/${templateId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Błąd podczas pobierania podglądu',
        );
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Zmień aktualny szablon
  const setCurrentTemplate = (templateConfig) => {
    setCurrentTemplateConfig(templateConfig);
  };

  // Pobierz konfiguracje przy pierwszym załadowaniu
  useEffect(() => {
    if (authToken) {
      fetchTemplateConfigs();
    }
  }, [authToken, fetchTemplateConfigs]);

  return {
    templateConfigs,
    currentTemplateConfig,
    loading,
    error,
    saveTemplateConfig,
    uploadLogo,
    setDefaultTemplate,
    deleteTemplateConfig,
    getTemplatePreview,
    setCurrentTemplate,
    fetchTemplateConfigs,
  };
};

export default useTemplateConfig;
