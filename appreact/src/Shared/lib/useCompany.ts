import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import {
  getCompanyData,
  addCompanyData,
} from '../../app/store/Actions/mycompanyActions';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { Company, User, TextFieldChangeHandler } from '../../types/common';

interface UseCompanyReturn {
  updatedCompanyData: Partial<Company>;
  setCompanyData: (data: Partial<Company>) => void;
  companyData: Company | null;
  handleChange: TextFieldChangeHandler;
  handleSubmit: () => void;
  loadCompanyData: () => void;
  loadDataToForm: () => void;
  handleLogoChange: (logoData: string) => void;
  handleLogoRemove: () => void;
}

export const useCompany = (): UseCompanyReturn => {
  const dispatch = useDispatch();
  const companyData: Company | null = useSelector(
    (state: RootState) => state.myCompany.companyData,
  );

  // Użytkownik z systemu uwierzytelniania
  const currentUser: User | null = useSelector(
    (state: RootState) => state.auth.userDetails,
  );

  // ✅ NAPRAWIONO: compatybilność mail/email
  const userEmail = currentUser?.mail || currentUser?.email;

  console.log('🏢 useCompany - currentUser:', currentUser);
  console.log('🏢 useCompany - userEmail:', userEmail);
  console.log('🏢 useCompany - companyData z store:', companyData);

  // Prosty stan formularza - początkowo pusty
  const [updatedCompanyData, setCompanyData] = useState<Partial<Company>>({});

  console.log('🏢 useCompany - updatedCompanyData:', updatedCompanyData);

  const handleChange: TextFieldChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    console.log('🏢 useCompany - handleChange:', e.target.name, e.target.value);
    const { name, value } = e.target;
    setCompanyData({
      ...updatedCompanyData,
      [name]: value,
      // ✅ NAPRAWIONO: użyję mail zamiast email
      userEmail: userEmail,
    });
  };

  const handleSubmit = useCallback((): void => {
    console.log(
      '🏢 useCompany - handleSubmit - dane do zapisania:',
      updatedCompanyData,
    );
    if (currentUser && userEmail) {
      // ✅ NAPRAWIONO: przekazywanie danych z userEmail
      const dataToSave = {
        ...updatedCompanyData,
        userEmail: userEmail,
      };
      console.log('🏢 useCompany - handleSubmit - finalne dane:', dataToSave);
      dispatch(addCompanyData(dataToSave, { mail: userEmail }) as any);
    } else {
      console.error(
        '🏢 useCompany - handleSubmit - brak użytkownika lub emaila',
      );
    }
  }, [currentUser, dispatch, updatedCompanyData, userEmail]);

  // Jedyna funkcja do załadowania danych z serwera (wywołana ręcznie)
  const loadCompanyData = useCallback((): void => {
    console.log(
      '🏢 useCompany - loadCompanyData - ładowanie danych dla:',
      userEmail,
    );
    if (currentUser && userEmail) {
      dispatch(getCompanyData({ mail: userEmail }) as any);
    } else {
      console.error(
        '🏢 useCompany - loadCompanyData - brak użytkownika lub emaila',
      );
    }
  }, [currentUser, dispatch, userEmail]);

  // Funkcja do załadowania danych do formularza (wywołana ręcznie)
  const loadDataToForm = useCallback((): void => {
    console.log('🏢 useCompany - loadDataToForm - dane z store:', companyData);
    if (companyData) {
      console.log(
        '🏢 useCompany - loadDataToForm - ustawianie formularza:',
        companyData,
      );
      setCompanyData(companyData);
    }
  }, [companyData]);

  const handleLogoChange = useCallback((logoData: string): void => {
    setCompanyData((prev) => ({
      ...prev,
      logo: logoData,
    }));
  }, []);

  const handleLogoRemove = useCallback((): void => {
    setCompanyData((prev) => ({
      ...prev,
      logo: undefined,
    }));
  }, []);

  return {
    updatedCompanyData,
    setCompanyData,
    companyData,
    handleChange,
    handleSubmit,
    loadCompanyData,
    loadDataToForm,
    handleLogoChange,
    handleLogoRemove,
  };
};

export default useCompany;
