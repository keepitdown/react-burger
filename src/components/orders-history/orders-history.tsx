import React, { FC } from 'react';
import styles from './orders-history.module.css';
import ProfileLayout from '../profile-layout/profile-layout';
import OrderList from '../order-list/order-list';
import OrderCard from '../order-card/order-card';
import { done } from '../../utils/constants';

// ======================Удалить!===================================
import { testFeed } from '../../utils/test-data';


const OrdersHistory: FC = () => {


  const orders = testFeed;

  return (
    <ProfileLayout >
      <OrderList extraClass={styles.list}>
        {orders && orders.map((item, index) => (
          <OrderCard
            key={index}
            orderId={'456789'}
            orderNumber={2432}
            name={'sdfds'}
            status={done}
            ingredients={item}
            timestamp='2023-04-30T21:33:32.877Z'
            extraClass={styles['list-item'] + ((index > 0) ? ' mt-4' : '')}
          />
        ))}
      </OrderList>
    </ProfileLayout>
  )
}

export default OrdersHistory;