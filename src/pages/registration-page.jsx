import React, { useEffect } from 'react';
import AppHeader from '../components/app-header/app-header';
import AppMain from '../components/app-main/app-main';
import { changePageTitle } from '../utils/functions';
import RegistrationForm from '../components/registration-form/registration-form';

function RegistrationPage() {

  useEffect(() => changePageTitle('Регистрация'), []);

  return (
    <>
      <AppHeader />
      <AppMain>
        <RegistrationForm />
      </AppMain>
    </>
  )
}

export default RegistrationPage;