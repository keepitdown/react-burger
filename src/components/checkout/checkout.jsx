import React, {useMemo, useState} from 'react';
import styles from './checkout.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Checkout({ ingridientsList, extraClass, buttonHandler }) {

  const totalPrice = useMemo(
    () => ingridientsList.reduce((total, currentItem) => currentItem.price + total, 0)
    , [ingridientsList]);

  return (
    <div className={styles.container + (extraClass ? (' ' + extraClass) : '')}>
      <div className={styles['total-price'] + ' mr-10'}>
        <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={buttonHandler}>
        Оформить заказ
      </Button>
    </div>
  )
}

export default Checkout;