import React, { FC, useEffect } from 'react';
import { useSelector } from '../services/hooks';
import ErrorMessage from '../components/error-message/error-message';
import { changePageTitle } from '../utils/functions';
import OrderSection from '../components/order-section/order-section';

const OrderPage: FC = () => {

  useEffect(() => changePageTitle('Детали заказа'), []);

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    !requestHasFailed
      ? (
        <OrderSection />
      )
      : (<ErrorMessage>Не удалось установить связь с сервером</ErrorMessage>)
  );
}

export default OrderPage;