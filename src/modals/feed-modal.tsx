import React, { FC, useEffect, useState } from 'react';
import { useSelector } from '../services/hooks';
import { useParams, useNavigate } from 'react-router';
import Modal from '../components/modal/modal';
import { TOrder } from '../utils/types';
import OrderDetails from '../components/order-details/order-details';

const FeedModal: FC = () => {

  const [orderData, setOrderData] = useState<TOrder>();

  const { dataIsLoaded, orderFeed } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    orderFeed: state.feedWs.feed
  }));

  const { id: orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderFeed) {
      const orderData = orderFeed.find(item => item._id === orderId);
      if (!orderData) {
        navigate(`/feed/${orderId}`, { state: { orderNotFound: true }, replace: true });
      } else {
        setOrderData({ ...orderData });
      }
    }
  }, [orderFeed, orderId, navigate]);

  if (!dataIsLoaded || !orderData) {
    return null;
  }

  return (
    <Modal
      header={
        <span className="text text_type_digits-default">
          {`#${orderData.number}`}
        </span>
      }
      closeHandler={() => navigate(-1)}
    >
      <OrderDetails modal orderData={orderData} />
    </Modal>
  );
};

export default FeedModal;