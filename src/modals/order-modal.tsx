import React, { FC, useEffect, useState } from 'react';
import { useSelector } from '../services/hooks';
import { useParams, useNavigate } from 'react-router';
import Modal from '../components/modal/modal';
import { TIngredient } from '../utils/types';
import OrderDetails from '../components/order-details/order-details';

const OrderModal: FC = () => {

  const [ingredientData, setIngredientData] = useState<TIngredient>();

  const { dataIsLoaded, availableIngredients } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    availableIngredients: state.burgerIngredients.data
  }));

  const { id: orderId } = useParams();
  const navigate = useNavigate();

  return (
    <Modal
      header={
        <span className="text text_type_digits-default">
          {`#${orderId}`}
        </span>
      }
      closeHandler={() => navigate(-1)}
    >
      <OrderDetails modal status={'done'} orderData={5} />
    </Modal>
  );
};

export default OrderModal;