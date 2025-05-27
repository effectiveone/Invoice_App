import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPageHeader from './LoginPageHeader';

describe('LoginPageHeader', () => {
  it('renders the welcome back title', () => {
    const { getByText } = render(<LoginPageHeader />);
    expect(getByText('Witaj ponownie!')).toBeInTheDocument();
  });

  it('renders the happy message', () => {
    const { getByText } = render(<LoginPageHeader />);
    expect(
      getByText('Zaloguj się do swojego konta fakturowego'),
    ).toBeInTheDocument();
  });
});
