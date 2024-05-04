import React from "react";
import InputWithLabel from "../../Shared/Components/InputWithLabel";
import { t } from "i18next";

const RegisterPageInputs = (props) => {
  const { mail, setMail, username, setUsername, password, setPassword } = props;

  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail address"
        type="text"
        placeholder={t("enterEmail")}
      />
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder={t("enterUsername")}
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label={t("password")}
        type="password"
        placeholder={t("enterPassword")}
      />
    </>
  );
};

export default RegisterPageInputs;
