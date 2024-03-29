import React, { FC, useEffect } from 'react';
import ErrorMessage from '../components/error-message/error-message';
import { changePageTitle } from '../utils/functions';

const NotFoundPage: FC = () => {

  useEffect(() => changePageTitle('Страница отсутствует'), []);

  return (<ErrorMessage>Страница по указанному Вами адресу недоступна или не существует</ErrorMessage>);
};

export default NotFoundPage;