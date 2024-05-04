import React, { useState, useEffect } from 'react';
import AuthBox from '../../Shared/Components/AuthBox';
import LoginPageFooter from './LoginPageFooter';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import { validateLoginForm } from '../../Shared/Utils/validators';
import { connect } from 'react-redux';
import { getActions } from '../../Store/Actions/alertActions';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ loginAction }) => {
  const history = useNavigate();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = () => {
    const userDetails = {
      mail,
      password,
    };

    loginAction(userDetails, history);
  };

  return (
    <>
      <AuthBox>
        <LoginPageHeader />
        <LoginPageInputs
          mail={mail}
          setMail={setMail}
          password={password}
          setPassword={setPassword}
        />
        <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
      </AuthBox>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
