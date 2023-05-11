import React, { FC, useEffect } from 'react';
import styles from './orders-history.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import ProfileLayout from '../profile-layout/profile-layout';
import OrderList from '../order-list/order-list';
import OrderCard from '../order-card/order-card';
import { historyWsClose, historyWsStart } from '../../services/actions/order-history-ws';
import { useLocation, useNavigate } from 'react-router-dom';

const OrdersHistory: FC = () => {

  const { dataIsLoaded, historyData } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    historyData: state.historyWs.history
  }));

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const cardClickHandler = (orderId: string): void => {
    navigate(`/profile/orders/${orderId}`, { state: { background: location } });
  };

  useEffect(() => {
    dispatch(historyWsStart());

    return () => {
      dispatch(historyWsClose());
    }
  }, [dispatch]);

  return (
    <ProfileLayout >
      <OrderList extraClass={styles.list}>
        {dataIsLoaded && historyData && historyData.map((item, index) => (
          <OrderCard
            key={item._id}
            orderData={item}
            displayStatus
            clickHandler={(): void => cardClickHandler(item._id)}
            extraClass={styles['list-item'] + ((index > 0) ? ' mt-4' : '')}
          />
        ))}
      </OrderList>
    </ProfileLayout>
  )
}

export default OrdersHistory;