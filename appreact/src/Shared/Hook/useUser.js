import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSettings } from '../../Store/Actions/settingsActions';

export const useUser = () => {
  const user = useSelector((state) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem('user'));
  const currentUser = user ?? localUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getSettings(currentUser));
    }
  }, [dispatch, currentUser]);

  return {
    currentUser,
  };
};
