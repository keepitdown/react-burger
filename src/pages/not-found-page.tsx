import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ErrorMessage from '../components/error-message/error-message';
import { changePageTitle } from '../utils/functions';

const NotFoundPage: FC = () => {

  useEffect(() => changePageTitle('Страница отсутствует'), []);

  const requestHasFailed = useSelector<any, boolean>(state => state.burgerIngredients.requestHasFailed);

  return (<ErrorMessage>Страница по указанному Вами адресу недоступна или не существует</ErrorMessage>);
};

export default NotFoundPage;