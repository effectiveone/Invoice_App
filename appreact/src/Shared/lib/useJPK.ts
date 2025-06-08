import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendJPK, getJPK } from '../../app/store/Actions/jpkActions';
import { useUser } from './useUser';

interface JPKState {
  jpkList?: {
    jpk?: {
      allInvoices?: any[];
    };
  };
}

interface RootStateJPK {
  jpk: JPKState;
}

export const useJPK = () => {
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const jpk = useSelector(
    (state: RootStateJPK) => state.jpk?.jpkList?.jpk?.allInvoices,
  );

  const sendToConsumerJPK = (
    selectedYear: number,
    selectedMonth: number,
  ): void => {
    dispatch(sendJPK(currentUser as any, selectedYear, selectedMonth) as any);
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getJPK(currentUser as any) as any);
    }
  }, [currentUser, dispatch]);

  return { jpk, sendToConsumerJPK };
};
