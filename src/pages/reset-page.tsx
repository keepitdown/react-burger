import React, { FC, useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import ResetForm from '../components/reset-form/reset-form';

const ResetPage: FC = () => {

  useEffect(() => changePageTitle('Восстановление пароля'), []);

  return (<ResetForm />);
};

export default ResetPage;