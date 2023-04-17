import React, { useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import OrdersHistory from '../components/orders-history/orders-history';

function OrdersPage() {

  useEffect(() => changePageTitle('История заказов'), []);

  return (<OrdersHistory />);
}

export default OrdersPage;