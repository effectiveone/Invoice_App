import BasicInvoiceTemplate from './BasicInvoiceTemplate';
import MediumInvoiceTemplate from './MediumInvoiceTemplate';
import SimpleInvoiceTemplate from './SimpleInvoiceTemplate';
import ModernTemplate from './ModernTemplate';
import CorporateTemplate from './CorporateTemplate';
import CreativeTemplate from './CreativeTemplate';
import MinimalTemplate from './MinimalTemplate';
import { useSelector } from 'react-redux';
import { useTemplateConfig } from '../../Hook/useTemplateConfig';

const FactoryInvoicePrinter = () => {
  const selectedOption = useSelector(
    (state) => state?.settings.settings?.templateInvoice,
  );

  // Pobierz kolory z motywu aplikacji
  const designSettings = useSelector((state) => state?.settings?.settings);
  const designSystems = useSelector(
    (state) => state?.settings?.mySystemOfDesign,
  );
  const currentDesign = designSystems?.find(
    (design) => design.name === designSettings?.designName,
  );

  // Hook do zarządzania konfiguracją szablonów
  const { currentTemplateConfig, templateConfigs } = useTemplateConfig();

  // Funkcja do generowania kolorów dla starych szablonów
  const getLegacyColors = () => {
    if (currentDesign) {
      return {
        primary: currentDesign.primaryColor,
        secondary: currentDesign.secondaryColor,
      };
    }
    return { primary: '#5D6975', secondary: '#0087C3' };
  };

  // Funkcja do renderowania nowych konfigurowalnych szablonów
  const renderConfigurableTemplate = (templateId) => {
    const config = currentTemplateConfig || {};
    const {
      layout = 'classic',
      colors = { primary: '#667eea', secondary: '#764ba2' },
      logo,
      customSettings = {},
    } = config;

    const templateProps = {
      layout,
      colors,
      logo,
      customSettings,
      templateConfig: config,
    };

    switch (templateId) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'corporate':
        return <CorporateTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  // Główna logika fabryki
  switch (selectedOption) {
    // Stare szablony (zachowane dla kompatybilności) z obsługą kolorów
    case 'basicInput':
      return (
        <BasicInvoiceTemplate
          colors={getLegacyColors()}
          logo={currentTemplateConfig?.logo}
        />
      );
    case 'mediumInput':
      return (
        <MediumInvoiceTemplate
          colors={getLegacyColors()}
          logo={currentTemplateConfig?.logo}
        />
      );
    case 'printerInput':
      return (
        <SimpleInvoiceTemplate
          colors={getLegacyColors()}
          logo={currentTemplateConfig?.logo}
        />
      );

    // Nowe konfigurowalne szablony
    case 'modernTemplate':
      return renderConfigurableTemplate('modern');
    case 'corporateTemplate':
      return renderConfigurableTemplate('corporate');
    case 'creativeTemplate':
      return renderConfigurableTemplate('creative');
    case 'minimalTemplate':
      return renderConfigurableTemplate('minimal');

    // Automatyczny wybór na podstawie konfiguracji użytkownika
    case 'autoTemplate':
      if (currentTemplateConfig) {
        return renderConfigurableTemplate(currentTemplateConfig.templateId);
      }
      return (
        <SimpleInvoiceTemplate
          colors={getLegacyColors()}
          logo={currentTemplateConfig?.logo}
        />
      );

    default:
      // Jeśli użytkownik ma zapisaną konfigurację, użyj jej
      if (currentTemplateConfig && currentTemplateConfig.isDefault) {
        return renderConfigurableTemplate(currentTemplateConfig.templateId);
      }
      return (
        <SimpleInvoiceTemplate
          colors={getLegacyColors()}
          logo={currentTemplateConfig?.logo}
        />
      );
  }
};

export default FactoryInvoicePrinter;
