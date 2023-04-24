import React, { FC, useEffect } from 'react';
import LoginForm from '../components/login-form/login-form';
import { changePageTitle } from '../utils/functions';

const LoginPage: FC = () => {

  useEffect(() => changePageTitle('Вход'), []);

  return (<LoginForm />);
};

export default LoginPage;