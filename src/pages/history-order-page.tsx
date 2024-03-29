import React, { FC, useEffect } from 'react';
import { useSelector } from '../services/hooks';
import ErrorMessage from '../components/error-message/error-message';
import { changePageTitle } from '../utils/functions';
import HistoryOrder from '../components/history-order/history-order';

const HistoryOrderPage: FC = () => {

  useEffect(() => changePageTitle('Детали заказа'), []);

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    !requestHasFailed
      ? (
        <HistoryOrder />
      )
      : (<ErrorMessage>Не удалось установить связь с сервером</ErrorMessage>)
  );
}

export default HistoryOrderPage;