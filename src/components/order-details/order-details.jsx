import React from 'react';
import { useSelector } from 'react-redux';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails() {

  const orderNumber = useSelector(state => state.orderDetails.orderNumber);

  return (
    <>
      <h2 className={styles['order-number'] + ' text text_type_digits-large mt-4 mb-8'}>{orderNumber}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={styles['confirm-icon']}><CheckMarkIcon type="primary" /></div>
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;