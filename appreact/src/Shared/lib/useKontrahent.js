import { useState } from 'react';
import {
  addContractorData,
  getContractorData,
  updateContractorData,
  deleteContractor,
} from '../../app/store/Actions/kontrahenciActions';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from './useUser';
import { useModal } from './useModal';

export const useKontrahent = () => {
  const { open, handleOpen, handleClose } = useModal();
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const kontrahent = useSelector((state) => state.kontrahenci?.contractorData);

  const handleSubmit = (formData) => {
    const dataToSubmit = {
      ...formData,
      userEmail: currentUser?.mail,
    };
    dispatch(addContractorData(dataToSubmit, currentUser));
  };

  const handleEdit = (id, formData) => {
    const dataToSubmit = {
      ...formData,
      userEmail: currentUser?.mail,
    };
    dispatch(updateContractorData(dataToSubmit, id, currentUser));
  };

  const loadKontrahents = () => {
    if (currentUser) {
      dispatch(getContractorData(currentUser));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteContractor(id, currentUser));
  };

  return {
    open,
    handleOpen,
    handleClose,
    handleEdit,
    handleDelete,
    kontrahent,
    handleSubmit,
    loadKontrahents,
  };
};
