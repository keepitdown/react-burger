import React, { useEffect } from 'react';
import AppHeader from '../components/app-header/app-header';
import AppMain from '../components/app-main/app-main';
import { changePageTitle } from '../utils/functions';
import OrdersHistory from '../components/orders-history/orders-history';

function OrdersPage() {

  useEffect(() => changePageTitle('История заказов'), []);

  return (
    <>
      <AppHeader activeTab="profile"/>
      <AppMain>
        <OrdersHistory />
      </AppMain>
    </>
  )
}

export default OrdersPage;