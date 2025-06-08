import React from 'react';
import store from '../store';
import { Provider } from 'react-redux';

const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
