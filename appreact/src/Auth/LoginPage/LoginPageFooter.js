import React from "react";
import CustomPrimaryButton from "../../Shared/Components/CustomPrimaryButton";
import RedirectInfo from "../../Shared/Components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { t } from "i18next";

const getFormNotValidMessage = () => {
  return t("enterEmailAdress");
};

const getFormValidMessage = () => {
  return t("pressLogIn");
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const history = useNavigate();

  const handlePushToRegisterPage = () => {
    history("/register");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label={t("login")}
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text={t("needAccount")}
        redirectText={t("createAccount")}
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
