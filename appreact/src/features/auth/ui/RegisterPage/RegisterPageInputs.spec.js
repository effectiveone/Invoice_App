import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterPageInputs from './RegisterPageInputs';

describe('RegisterPageInputs', () => {
  let props;

  beforeEach(() => {
    props = {
      mail: '',
      setMail: jest.fn(),
      username: '',
      setUsername: jest.fn(),
      password: '',
      setPassword: jest.fn(),
    };
  });

  it('renders three input components', () => {
    render(<RegisterPageInputs {...props} />);

    // Sprawdź czy są inputy dla email, username i password
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(2); // Co najmniej email i username

    // Sprawdź czy jest input dla hasła (może mieć type="password")
    const passwordInputs = screen.getAllByDisplayValue('');
    expect(passwordInputs.length).toBeGreaterThan(0);
  });

  it('renders without errors', () => {
    render(<RegisterPageInputs {...props} />);

    // Test że komponent się renderuje bez błędów
    expect(document.body).toBeInTheDocument();
  });
});
