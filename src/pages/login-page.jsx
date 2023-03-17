import React, { useState, useEffect } from 'react';
import AppHeader from '../components/app-header/app-header';
import AppMain from '../components/app-main/app-main';
import LoginForm from '../components/login-form/login-form';
import ErrorMessage from '../components/error-message/error-message';
import { changePageTitle } from '../utils/functions';

function LoginPage() {

  useEffect(() => changePageTitle('Вход'), []);

  return (
    <>
      <AppHeader />
      <AppMain>
        <LoginForm />
      </AppMain>
    </>
  )
}

export default LoginPage;