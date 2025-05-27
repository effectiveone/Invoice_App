import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const RouterProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
