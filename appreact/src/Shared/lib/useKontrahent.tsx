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
  const kontrahent = useSelector(
    (state: any) => state.kontrahenci?.contractorData,
  );

  console.log('👥 useKontrahent - currentUser:', currentUser);
  console.log(
    '👥 useKontrahent - userEmail:',
    currentUser?.mail || currentUser?.email,
  );
  console.log('👥 useKontrahent - kontrahent z Redux:', kontrahent);

  const handleSubmit = (formData: any) => {
    console.log('👥 useKontrahent - handleSubmit wywołane z danymi:', formData);
    console.log(
      '👥 useKontrahent - userEmail do wysłania:',
      currentUser?.mail || currentUser?.email,
    );

    if (!currentUser?.mail && !currentUser?.email) {
      console.log(
        '👥 useKontrahent - Brak userEmail, nie mogę dodać kontrahenta',
      );
      return;
    }

    const dataToSubmit = {
      ...formData,
      userEmail: currentUser?.mail || currentUser?.email,
    };

    console.log('👥 useKontrahent - Wysyłam dane do dispatch:', dataToSubmit);

    // Tworzymy obiekt User z wymaganym mail
    const userForAction = {
      ...currentUser,
      mail: currentUser?.mail || currentUser?.email || '',
    };

    dispatch(addContractorData(dataToSubmit, userForAction) as any);
  };

  const handleEdit = (id: string, formData: any) => {
    console.log(
      '👥 useKontrahent - handleEdit wywołane z ID:',
      id,
      'i danymi:',
      formData,
    );
    console.log(
      '👥 useKontrahent - userEmail do wysłania:',
      currentUser?.mail || currentUser?.email,
    );

    if (!currentUser?.mail && !currentUser?.email) {
      console.log(
        '👥 useKontrahent - Brak userEmail, nie mogę edytować kontrahenta',
      );
      return;
    }

    const dataToSubmit = {
      ...formData,
      userEmail: currentUser?.mail || currentUser?.email,
    };

    console.log(
      '👥 useKontrahent - Wysyłam dane do dispatch (edit):',
      dataToSubmit,
    );

    // Tworzymy obiekt User z wymaganym mail
    const userForAction = {
      ...currentUser,
      mail: currentUser?.mail || currentUser?.email || '',
    };

    dispatch(updateContractorData(dataToSubmit, id, userForAction) as any);
  };

  const loadKontrahents = () => {
    console.log(
      '👥 useKontrahent - loadKontrahents wywołane z userEmail:',
      currentUser?.mail || currentUser?.email,
    );

    if (currentUser?.mail || currentUser?.email) {
      const dataToSend = { userEmail: currentUser?.mail || currentUser?.email };
      console.log(
        '👥 useKontrahent - Wysyłam dane do dispatch (read):',
        dataToSend,
      );

      // Tworzymy obiekt User z wymaganym mail
      const userForAction = {
        ...currentUser,
        mail: currentUser?.mail || currentUser?.email || '',
      };

      dispatch(getContractorData(userForAction) as any);
    } else {
      console.log('👥 useKontrahent - Brak userEmail, nie ładuję kontrahentów');
    }
  };

  const handleDelete = (id: string) => {
    console.log('👥 useKontrahent - handleDelete wywołane z ID:', id);
    console.log(
      '👥 useKontrahent - userEmail do wysłania:',
      currentUser?.mail || currentUser?.email,
    );

    if (currentUser?.mail || currentUser?.email) {
      console.log('👥 useKontrahent - Wysyłam dane do dispatch (delete):', {
        id,
        userEmail: currentUser?.mail || currentUser?.email,
      });

      // Tworzymy obiekt User z wymaganym mail
      const userForAction = {
        ...currentUser,
        mail: currentUser?.mail || currentUser?.email || '',
      };

      dispatch(deleteContractor(id, userForAction) as any);
    } else {
      console.log('👥 useKontrahent - Brak userEmail, nie usuwam kontrahenta');
    }
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

export default useKontrahent;
