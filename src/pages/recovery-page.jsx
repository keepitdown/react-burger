import React, { useEffect } from 'react';
import AppHeader from '../components/app-header/app-header';
import AppMain from '../components/app-main/app-main';
import { changePageTitle } from '../utils/functions';
import RecoveryForm from '../components/recovery-form/recovery-form';

function RecoveryPage() {

  useEffect(() => changePageTitle('Восстановление пароля'), []);

  return (
    <>
      <AppHeader activeTab="profile"/>
      <AppMain>
        <RecoveryForm />
      </AppMain>
    </>
  )
}

export default RecoveryPage;