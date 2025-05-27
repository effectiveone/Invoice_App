import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendJPK, getJPK } from '../../app/store/Actions/jpkActions';
import { useUser } from './useUser';

export const useJPK = () => {
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const jpk = useSelector((state) => state.jpk?.jpkList?.jpk?.allInvoices);

  const sendToConsumerJPK = (selectedYear, selectedMonth) => {
    dispatch(sendJPK(currentUser, selectedYear, selectedMonth));
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getJPK(currentUser));
    }
  }, [currentUser, dispatch]);

  return { jpk, sendToConsumerJPK };
};
