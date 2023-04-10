import React, { useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import RecoveryForm from '../components/recovery-form/recovery-form';

function RecoveryPage() {

  useEffect(() => changePageTitle('Восстановление пароля'), []);

  return (
    <>
      <RecoveryForm />
    </>
  )
}

export default RecoveryPage;