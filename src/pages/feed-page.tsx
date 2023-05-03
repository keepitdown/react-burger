import React, { FC, useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import OrderFeed from '../components/order-feed/order-feed';

const FeedPage: FC = () => {

  useEffect(() => changePageTitle('Лента заказов'), []);

  return (
    <OrderFeed />
  );
}

export default FeedPage;