import React, { FC, useEffect, useState } from 'react';
import styles from './order-section.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { TIngredient } from '../../utils/types';
import OrderDetails from '../order-details/order-details';

const OrderSection: FC = () => {

  const [ingredientData, setIngredientData] = useState<TIngredient>();

  const navigate = useNavigate();

  const { id: orderId } = useParams();

  const { dataIsLoaded, availableIngredients } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    availableIngredients: state.burgerIngredients.data
  }));

  return (
    <section className={styles.container + ' mt-30'}>
      <h1 className="text text_type_digits-default">
        {`#${orderId}`}
      </h1>
      <OrderDetails orderData={5} status={'done'} />
    </section>
  );
};

export default OrderSection;