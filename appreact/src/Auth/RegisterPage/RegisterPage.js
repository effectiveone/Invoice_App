import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { PersonAdd } from '@mui/icons-material';
import AuthBox from '../../Shared/Components/AuthBox';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';
import { validateRegisterForm } from '../../Shared/Utils/validators';
import { connect } from 'react-redux';
import { getActions } from '../../Store/Actions/authActions';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled(Box)({
  textAlign: 'center',
  marginBottom: '32px',
});

const IconWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
});

const StyledIcon = styled(PersonAdd)({
  fontSize: '48px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '50%',
  padding: '8px',
  color: 'white',
});

const Title = styled(Typography)({
  color: '#1f2937',
  fontWeight: '700',
  marginBottom: '8px',
  fontSize: '28px',
  letterSpacing: '-0.02em',
});

const Subtitle = styled(Typography)({
  color: '#6b7280',
  fontSize: '16px',
  fontWeight: '400',
});

const RegisterPage = ({ register }) => {
  const history = useNavigate();

  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = () => {
    const userDetails = {
      mail,
      password,
      username,
    };

    register(userDetails, history);
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        mail,
        username,
        password,
      }),
    );
  }, [mail, username, password, setIsFormValid]);

  return (
    <AuthBox>
      <HeaderContainer>
        <IconWrapper>
          <StyledIcon />
        </IconWrapper>
        <Title variant='h4'>Utwórz konto</Title>
        <Subtitle>Zacznij tworzyć faktury już dziś</Subtitle>
      </HeaderContainer>

      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(RegisterPage);
