import { useCompanyContext } from '../../../../entities/user/model/useCompanyContext';
import CompanyForm from './companyForm';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const CompanyContent = () => {
  const {
    updatedCompanyData,
    handleChange,
    handleSubmit,
    loadCompanyData,
    loadDataToForm,
  } = useCompanyContext();
  const { t } = useTranslation();

  // Załadowanie danych przy pierwszym renderze
  useEffect(() => {
    loadCompanyData();
  }, []);

  // Załadowanie danych do formularza gdy są dostępne
  useEffect(() => {
    loadDataToForm();
  }, []);

  return (
    <>
      <CompanyForm
        whichInputs='company'
        updatedCompanyData={updatedCompanyData}
        handleChange={handleChange}
      />
      <Button onClick={handleSubmit}>{t('submit')}</Button>
    </>
  );
};
