import React, { FC, useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import RecoveryForm from '../components/recovery-form/recovery-form';

const RecoveryPage: FC = () => {

  useEffect(() => changePageTitle('Восстановление пароля'), []);

  return (<RecoveryForm />);
};

export default RecoveryPage;