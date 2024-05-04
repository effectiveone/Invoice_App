import React from "react";
import CustomPrimaryButton from "../../Shared/Components/CustomPrimaryButton";
import RedirectInfo from "../../Shared/Components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { t } from "i18next";

const getFormNotValidMessage = () => {
  return t("usernameRestriction");
};

const getFormValidMessage = () => {
  return t("pressRegister");
};

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const history = useNavigate();

  const handlePushToLoginPage = () => {
    history("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label={t("register")}
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText={t("accountHave")}
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
