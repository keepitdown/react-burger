import React, { FC, useEffect, useState } from 'react';
import styles from './history-order.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import { TOrder } from '../../utils/types';
import OrderDetails from '../order-details/order-details';
import { historyWsClose, historyWsStart } from '../../services/actions/order-history-ws';

const HistoryOrder: FC = () => {

  const [orderData, setOrderData] = useState<TOrder>();

  const { dataIsLoaded, orderHistory } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    orderHistory: state.historyWs.history
  }));

  const dispatch = useDispatch();

  const { id: orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(historyWsStart());

    return () => {
      dispatch(historyWsClose());
    }
  }, [dispatch]);

  useEffect(() => {
    if (orderHistory) {
      const orderData = orderHistory.find(item => item._id === orderId);
      if (!orderData) {
        navigate(`/profile/order/${orderId}`, { state: { orderNotFound: true }, replace: true });
      } else {
        setOrderData({ ...orderData });
      }
    }
  }, [orderHistory]);

  if (!dataIsLoaded || !orderData) {
    return null;
  }

  return (
    <section className={styles.container + ' mt-30'}>
      <h1 className="text text_type_digits-default">
        {`#${orderData.number}`}
      </h1>
      <OrderDetails orderData={orderData} />
    </section>
  );
};

export default HistoryOrder;