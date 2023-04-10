import React, { useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import RegistrationForm from '../components/registration-form/registration-form';

function RegistrationPage() {

  useEffect(() => changePageTitle('Регистрация'), []);

  return (
    <>
      <RegistrationForm />
    </>
  )
}

export default RegistrationPage;