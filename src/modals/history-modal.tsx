import React, { FC, useEffect, useState } from 'react';
import { useSelector } from '../services/hooks';
import { useParams, useNavigate } from 'react-router';
import Modal from '../components/modal/modal';
import { TOrder } from '../utils/types';
import OrderDetails from '../components/order-details/order-details';

const HistoryModal: FC = () => {

  const [orderData, setOrderData] = useState<TOrder>();

  const { dataIsLoaded, orderHistory } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    orderHistory: state.historyWs.history
  }));

  const { id: orderId } = useParams();
  const navigate = useNavigate();

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

export default HistoryModal;