import React from 'react';
import InputWithLabel from '../../../../shared/ui/InputWithLabel';
import { useTranslation } from 'react-i18next';

interface RegisterPageInputsProps {
  mail: string;
  setMail: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

const RegisterPageInputs = (props: RegisterPageInputsProps) => {
  const { mail, setMail, username, setUsername, password, setPassword } = props;
  const { t } = useTranslation();

  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label='E-mail address'
        type='text'
        placeholder={t('enterEmail')}
      />
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label='Username'
        type='text'
        placeholder={t('enterUsername')}
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

export default RegisterPageInputs;
