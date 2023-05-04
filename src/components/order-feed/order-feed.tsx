import React, { FC, useState } from 'react';
import styles from './order-feed.module.css';
import OrderList from '../order-list/order-list';
import OrderCard from '../order-card/order-card';
import StatusBoard from '../status-board/status-board';
import StatValue from '../stat-value/stat-value';
import StatusBoardGroup from '../status-board-group/status-board-group';
import { done, pending } from '../../utils/constants';
// ======================Удалить!===================================
import { testFeed, testOrderList } from '../../utils/test-data';

type TOrderFeed = {
  extraClass?: string;
};

const orders = testFeed;

const OrderFeed: FC<TOrderFeed> = ({ extraClass }) => {

  return (
    <section className={styles.section + (extraClass ? (' ' + extraClass) : '')}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.content}>
        <OrderList extraClass={styles.list + ' pr-4'}>
          {orders && orders.map((item, index) => (
            <OrderCard
              key={index}
              orderId={456789}
              ingredients={item}
              timestamp='2023-04-30T21:33:32.877Z'
              extraClass={styles['list-item'] + ((index > 0) ? ' mt-4' : '')}
            />
          ))}
        </OrderList>
        <div className={styles.summary}>
          <StatusBoard>
            <StatusBoardGroup orderIds={testOrderList} status={done} />
            <StatusBoardGroup orderIds={testOrderList} status={pending} extraClass='ml-9' />
          </StatusBoard>
          <StatValue value={27752} extraClass="mt-15">
            Выполнено за все время:
          </StatValue>
          <StatValue value={138} extraClass="mt-15">
            Выполнено за сегодня:
          </StatValue>
        </div>
      </div>
    </section>
  )
};

export default OrderFeed;