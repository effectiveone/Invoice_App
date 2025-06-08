import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSettings } from '../../app/store/Actions/settingsActions';
import type { RootState } from '../../app/store';
import type { User } from '../../types/common';

interface UseUserReturn {
  currentUser: User | null;
}

export const useUser = (): UseUserReturn => {
  const user: User | null = useSelector(
    (state: RootState) => state.auth.userDetails,
  );
  const localUser: User | null = JSON.parse(
    localStorage.getItem('user') || 'null',
  );
  const currentUser: User | null = user ?? localUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getSettings(currentUser as any) as any);
    }
  }, [dispatch, currentUser]);

  return {
    currentUser,
  };
};

export default useUser;
