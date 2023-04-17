import React, { useEffect } from 'react';
import LoginForm from '../components/login-form/login-form';
import { changePageTitle } from '../utils/functions';

function LoginPage() {

  useEffect(() => changePageTitle('Вход'), []);

  return (<LoginForm />);
}

export default LoginPage;