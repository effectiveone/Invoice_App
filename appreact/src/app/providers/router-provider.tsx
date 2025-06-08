import React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface RouterProviderProps {}

export const RouterProvider: React.FC<
  React.PropsWithChildren<RouterProviderProps>
> = ({ children }): JSX.Element => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
