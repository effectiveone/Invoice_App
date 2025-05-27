import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPageInputs from './LoginPageInputs';

describe('LoginPageInputs', () => {
  it('should render input fields with proper labels and placeholders', () => {
    const { getByPlaceholderText } = render(
      <LoginPageInputs
        mail=''
        setMail={() => {}}
        password=''
        setPassword={() => {}}
      />,
    );

    expect(getByPlaceholderText('enterEmail')).toBeInTheDocument();
    expect(getByPlaceholderText('enterPassword')).toBeInTheDocument();
  });

  it('should update mail and password states when typing in the inputs', () => {
    const setMail = jest.fn();
    const setPassword = jest.fn();
    const { getByPlaceholderText } = render(
      <LoginPageInputs
        mail=''
        setMail={setMail}
        password=''
        setPassword={setPassword}
      />,
    );

    fireEvent.change(getByPlaceholderText('enterEmail'), {
      target: { value: 'test' },
    });
    expect(setMail).toHaveBeenCalledWith('test');

    fireEvent.change(getByPlaceholderText('enterPassword'), {
      target: { value: 'test123' },
    });
    expect(setPassword).toHaveBeenCalledWith('test123');
  });
});
