import React, { useEffect } from 'react';
import AppHeader from '../components/app-header/app-header';
import AppMain from '../components/app-main/app-main';
import { changePageTitle } from '../utils/functions';
import ResetForm from '../components/reset-form/reset-form';

function ResetPage() {

  useEffect(() => changePageTitle('Восстановление пароля'), []);

  return (
    <>
      <AppHeader />
      <AppMain>
        <ResetForm />
      </AppMain>
    </>
  )
}

export default ResetPage;