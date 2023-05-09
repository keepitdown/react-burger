import React, { FC, useEffect } from 'react';
import { useSelector } from '../services/hooks';
import ErrorMessage from '../components/error-message/error-message';
import { changePageTitle } from '../utils/functions';
import FeedOrder from '../components/feed-order/feed-order';

const FeedOrderPage: FC = () => {

  useEffect(() => changePageTitle('Детали заказа'), []);

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    !requestHasFailed
      ? (
        <FeedOrder />
      )
      : (<ErrorMessage>Не удалось установить связь с сервером</ErrorMessage>)
  );
}

export default FeedOrderPage;