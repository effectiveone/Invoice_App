import { useState, useEffect } from 'react';
import {
  getCompanyData,
  addCompanyData,
} from '../../app/store/Actions/mycompanyActions';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from './useUser';

export const useCompany = () => {
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.myCompany.companyData);

  // Prosty stan formularza - początkowo pusty
  const [updatedCompanyData, setCompanyData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addCompanyData(updatedCompanyData, currentUser));
  };

  // Jedyna funkcja do załadowania danych z serwera (wywołana ręcznie)
  const loadCompanyData = () => {
    if (currentUser) {
      dispatch(getCompanyData(currentUser));
    }
  };

  // Funkcja do załadowania danych do formularza (wywołana ręcznie)
  const loadDataToForm = () => {
    if (companyData) {
      setCompanyData(companyData);
    }
  };

  return {
    updatedCompanyData,
    setCompanyData,
    companyData,
    handleChange,
    handleSubmit,
    loadCompanyData,
    loadDataToForm,
  };
};
