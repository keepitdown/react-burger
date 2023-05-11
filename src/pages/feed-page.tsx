import React, { FC, useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import OrderFeed from '../components/order-feed/order-feed';
import { useSelector } from '../services/hooks';
import MainNotification from '../components/main-notification/main-notification';

const FeedPage: FC = () => {

  useEffect(() => changePageTitle('Лента заказов'), []);

  const feedError = useSelector(state => state.feedWs.error);

  return (
    <>
    <OrderFeed />
    {feedError && (<MainNotification>Отсутствует соединение с сервером</MainNotification>)}
    </>
  );
}

export default FeedPage;