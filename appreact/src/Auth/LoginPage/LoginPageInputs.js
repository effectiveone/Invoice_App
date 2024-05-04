import React from "react";
import InputWithLabel from "../../Shared/Components/InputWithLabel";
import { t } from "i18next";
const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail"
        type="text"
        placeholder={t("enterEmail")}
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

export default LoginPageInputs;
