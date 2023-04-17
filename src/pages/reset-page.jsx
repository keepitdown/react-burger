import React, { useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import ResetForm from '../components/reset-form/reset-form';

function ResetPage() {

  useEffect(() => changePageTitle('Восстановление пароля'), []);

  return (<ResetForm />);
}

export default ResetPage;