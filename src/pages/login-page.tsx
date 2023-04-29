import React, { FC, useEffect } from 'react';
import { useSelector } from '../services/hooks';
import LoginForm from '../components/login-form/login-form';
import { changePageTitle } from '../utils/functions';
import MainNotification from '../components/main-notification/main-notification';

const LoginPage: FC = () => {

  useEffect(() => changePageTitle('Вход'), []);

  const showErrorMessage = useSelector(state => state.auth.forms.login.hasFailed);

  return (
    <>
      <LoginForm />
      {showErrorMessage && (<MainNotification>Неверный логин или пароль</MainNotification>)}
    </>
  );
};

export default LoginPage;