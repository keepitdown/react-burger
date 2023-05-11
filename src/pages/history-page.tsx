import React, { FC, useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import OrdersHistory from '../components/orders-history/orders-history';
import { useSelector } from '../services/hooks';
import MainNotification from '../components/main-notification/main-notification';

const HistoryPage: FC = () => {

  useEffect(() => changePageTitle('История заказов'), []);

  const historyError = useSelector(state => state.historyWs.error);

  return (<>
    <OrdersHistory />
    {historyError && (<MainNotification>Отсутствует соединение с сервером</MainNotification>)}
  </>
  );
};

export default HistoryPage;