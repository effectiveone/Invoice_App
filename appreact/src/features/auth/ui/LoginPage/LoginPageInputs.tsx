import React from 'react';
import InputWithLabel from '../../../../shared/ui/InputWithLabel';
import { useTranslation } from 'react-i18next';

interface LoginPageInputsProps {
  mail: string;
  setMail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

const LoginPageInputs = ({
  mail,
  setMail,
  password,
  setPassword,
}: LoginPageInputsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label='E-mail'
        type='text'
        placeholder={t('enterEmail')}
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label={t('password')}
        type='password'
        placeholder={t('enterPassword')}
      />
    </>
  );
};

export default LoginPageInputs;
