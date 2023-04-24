import React, { FC, useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import RegistrationForm from '../components/registration-form/registration-form';

const RegistrationPage: FC = () => {

  useEffect(() => changePageTitle('Регистрация'), []);

  return (<RegistrationForm />);
};

export default RegistrationPage;