import React, { FC, useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import { useSelector } from '../services/hooks';
import ResetForm from '../components/reset-form/reset-form';
import MainNotification from '../components/main-notification/main-notification';

const ResetPage: FC = () => {

  useEffect(() => changePageTitle('Восстановление пароля'), []);

  const showErrorMessage = useSelector(state => state.auth.forms.reset.hasFailed);

  return (
    <>
      <ResetForm />
      {showErrorMessage && (<MainNotification>Неверный код восстановления</MainNotification>)}
    </>
  );
};

export default ResetPage;