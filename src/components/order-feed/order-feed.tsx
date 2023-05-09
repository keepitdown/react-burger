import React, { FC, useEffect } from 'react';
import styles from './order-feed.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { feedWsClose, feedWsStart } from '../../services/actions/order-feed-ws';
import OrderList from '../order-list/order-list';
import OrderCard from '../order-card/order-card';
import StatusBoard from '../status-board/status-board';
import StatValue from '../stat-value/stat-value';
import StatusBoardGroup from '../status-board-group/status-board-group';
import { done, pending } from '../../utils/constants';
import { groupByPropValue } from '../../utils/functions';
import { TOrder } from '../../utils/types';

type TOrderFeed = {
  extraClass?: string;
};

const OrderFeed: FC<TOrderFeed> = ({ extraClass }) => {

  const dispatch = useDispatch();

  const { dataIsLoaded, feedData, ordersToday, orderTotal } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    feedData: state.feedWs.feed,
    ordersToday: state.feedWs.totalToday,
    orderTotal: state.feedWs.total
  }));

  const ordersInGroups = feedData && groupByPropValue<TOrder>(feedData, 'status');

  useEffect(() => {
    dispatch(feedWsStart());

    return () => {
      dispatch(feedWsClose());
    }
  }, [dispatch]);

  return (
    <section className={styles.section + (extraClass ? (' ' + extraClass) : '')}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.content}>
        <OrderList extraClass={styles.list + ' pr-4'}>
          {dataIsLoaded && feedData && feedData.map((item, index) => (
            <OrderCard
              key={item._id}
              orderData={item}
              extraClass={styles['list-item'] + ((index > 0) ? ' mt-4' : '')}
            />
          ))}
        </OrderList>
        <div className={styles.summary}>
          <StatusBoard>
            <StatusBoardGroup orders={ordersInGroups && ordersInGroups.done} status={done} />
            <StatusBoardGroup orders={ordersInGroups && ordersInGroups.pending} status={pending} extraClass='ml-9' />
          </StatusBoard>
          <StatValue value={orderTotal} extraClass="mt-15">
            Выполнено за все время:
          </StatValue>
          <StatValue value={ordersToday} extraClass="mt-15">
            Выполнено за сегодня:
          </StatValue>
        </div>
      </div>
    </section>
  )
};

export default OrderFeed;