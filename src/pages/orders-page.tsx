import React, { FC, useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import OrdersHistory from '../components/orders-history/orders-history';

const OrdersPage: FC = () => {

  useEffect(() => changePageTitle('История заказов'), []);

  return (<OrdersHistory />);
};

export default OrdersPage;