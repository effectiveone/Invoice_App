import { useCompanyContext } from '../../Context/useCompanyContext';
import CompanyForm from './companyForm';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const CompanyContent = () => {
  const { updatedCompanyData, handleChange, handleSubmit } =
    useCompanyContext();
  const { t } = useTranslation();

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
