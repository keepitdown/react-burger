import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppHeader from '../components/app-header/app-header';
import AppMain from '../components/app-main/app-main';
import ErrorMessage from '../components/error-message/error-message';
import { changePageTitle } from '../utils/functions';

function NotFoundPage() {

  useEffect(() => changePageTitle('Страница отсутствует'), []);

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    <>
      <AppHeader />
      <ErrorMessage>Страница по указанному Вами адресу недоступна или не существует</ErrorMessage>
    </>
  )
}

export default NotFoundPage;