import {
  addContractorData,
  getContractorData,
  updateContractorData,
  deleteContractor,
} from '../../Store/Actions/kontrahenciActions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useUser } from './useUser';
import { useModal } from './useModal';
import useSubmitButton from './useSubmitButton';

export const useKontrahent = () => {
  const { open, handleOpen, handleClose } = useModal();
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const kontrahent = useSelector((state) => state.kontrahenci?.contractorData);
  const [buttonText, setButtonText] = useState();

  const [updatedCompanyData, setCompanyData] = useState({
    nip: '',
    regon: '',
    street: '',
    city: '',
    zipCode: '',
    companyName: '',
    legalForm: '',
    userEmail: currentUser?.mail,
  });
  useEffect(() => {
    if (!kontrahent?.length && currentUser) {
      dispatch(getContractorData(currentUser));
    }
  }, [dispatch, kontrahent, currentUser]);

  const handleChange = (event) => {
    setCompanyData({
      ...updatedCompanyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(addContractorData(updatedCompanyData, currentUser));
    handleClose();
  };
  const [paramsId, setParamsId] = useState();
  const handleSubmitEdit = () => {
    dispatch(updateContractorData(updatedCompanyData, paramsId, currentUser));
    handleClose();
  };

  const handleModal = () => {
    setButtonText('Zapisz');
    handleOpen();
    setCompanyData({
      nip: '',
      regon: '',
      street: '',
      city: '',
      zipCode: '',
      companyName: '',
      legalForm: '',
      userEmail: currentUser?.mail,
    });
  };

  const handleEdit = (id) => {
    handleOpen();
    setParamsId(id);
    const thisKontrahent = kontrahent.find((konta) => konta._id === id);
    setCompanyData({
      nip: thisKontrahent.nip,
      regon: thisKontrahent.regon,
      street: thisKontrahent.street,
      city: thisKontrahent.city,
      zipCode: thisKontrahent.zipCode,
      companyName: thisKontrahent.companyName,
      legalForm: thisKontrahent.legalForm,
      userEmail: currentUser?.mail,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteContractor(id, currentUser));
  };

  const button = useSubmitButton(handleSubmit, handleSubmitEdit, buttonText);

  useEffect(() => {
    if (currentUser) {
      dispatch(getContractorData(currentUser));
    }
  }, [currentUser, dispatch]);

  return {
    button,
    setButtonText,
    handleModal,
    open,
    handleOpen,
    handleClose,
    handleEdit,
    handleDelete,
    updatedCompanyData,
    kontrahent,
    handleSubmit,
    handleChange,
  };
};
