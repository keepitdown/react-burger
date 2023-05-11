import React, { FC, useEffect, useState } from 'react';
import styles from './feed-order.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import { TOrder } from '../../utils/types';
import OrderDetails from '../order-details/order-details';
import { feedWsClose, feedWsStart } from '../../services/actions/order-feed-ws';

const FeedOrder: FC = () => {

  const [orderData, setOrderData] = useState<TOrder>();

  const { dataIsLoaded, orderFeed } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    orderFeed: state.feedWs.feed
  }));

  const dispatch = useDispatch();

  const { id: orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(feedWsStart());

    return () => {
      dispatch(feedWsClose());
    }
  }, [dispatch]);

  useEffect(() => {
    if (orderFeed) {
      const orderData = orderFeed.find(item => item._id === orderId);
      if (!orderData) {
        navigate(`/feed/${orderId}`, { state: { orderNotFound: true }, replace: true });
      } else {
        setOrderData({ ...orderData });
      }
    }
  }, [orderFeed]);

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

export default FeedOrder;