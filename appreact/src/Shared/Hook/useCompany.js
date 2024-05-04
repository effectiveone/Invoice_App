import { useState, useEffect } from 'react';
import {
  getCompanyData,
  addCompanyData,
} from '../../Store/Actions/mycompanyActions';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from './useUser';

export const useCompany = () => {
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.myCompany.companyData);

  const [updatedCompanyData, setCompanyData] = useState({});

  const handleChange = (event) => {
    setCompanyData({
      ...updatedCompanyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(addCompanyData(updatedCompanyData, currentUser));
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getCompanyData(currentUser));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (Object.keys(updatedCompanyData).length === 0) {
      setCompanyData(companyData);
    }
  }, [dispatch, companyData, updatedCompanyData]);

  return {
    updatedCompanyData,
    setCompanyData,
    companyData,
    handleChange,
    handleSubmit,
  };
};
