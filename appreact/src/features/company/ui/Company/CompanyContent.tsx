import { useCompanyContext } from '../../../../entities/user/model/useCompanyContext';
import CompanyForm from './companyForm';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLanguageListener } from '../../../../shared/lib/useLanguageListener';
import { useSelector } from 'react-redux';

export const CompanyContent = () => {
  const {
    updatedCompanyData,
    companyData,
    handleChange,
    handleSubmit,
    loadCompanyData,
    loadDataToForm,
    handleLogoChange,
    handleLogoRemove,
  } = useCompanyContext();
  const { t } = useTranslation();

  // 🔥 Hook który wymusza re-render przy zmianie języka
  const { currentLanguage } = useLanguageListener();

  // Załadowanie danych przy pierwszym renderze
  useEffect(() => {
    console.log('🏢 CompanyContent - useEffect dla loadCompanyData');
    loadCompanyData();
  }, [loadCompanyData]);

  // ✅ NAPRAWIONO: Automatyczne ładowanie danych do formularza gdy companyData się zmieni
  useEffect(() => {
    console.log(
      '🏢 CompanyContent - useEffect dla loadDataToForm, companyData:',
      companyData,
    );
    if (companyData && Object.keys(companyData).length > 0) {
      loadDataToForm();
    }
  }, [companyData, loadDataToForm]);

  // ✅ DODANO: Debug Redux store
  const authState = useSelector((state: any) => state.auth);
  const companyState = useSelector((state: any) => state.myCompany);
  const localUser = localStorage.getItem('user');

  return (
    <>
      {/* ✅ DODANO: Rozszerzony debug info */}
      <div
        style={{
          padding: 8,
          background: '#ffe6e6',
          marginBottom: 16,
          fontSize: 11,
          border: '1px solid #ccc',
        }}
      >
        <h4>🔍 DEBUG COMPANY</h4>
        <strong>🏪 Redux companyData:</strong> {JSON.stringify(companyData)}{' '}
        <br />
        <strong>📝 Form data:</strong> {JSON.stringify(updatedCompanyData)}{' '}
        <br />
        <strong>👤 Auth state:</strong> {JSON.stringify(authState)} <br />
        <strong>🏢 Company state:</strong> {JSON.stringify(companyState)} <br />
        <strong>💾 LocalStorage user:</strong> {localUser} <br />
      </div>

      <CompanyForm
        whichInputs='company'
        updatedCompanyData={updatedCompanyData}
        handleChange={handleChange}
        onLogoChange={handleLogoChange}
        onLogoRemove={handleLogoRemove}
      />
      <Button onClick={handleSubmit}>{t('submit')}</Button>
    </>
  );
};
