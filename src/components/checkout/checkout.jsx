import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './checkout.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/types';

function Checkout({ ingredientsList, extraClass, buttonHandler }) {

  const totalPrice = useMemo(
    () => ingredientsList.reduce((total, currentItem) => currentItem.price + total, 0)
    , [ingredientsList]);

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

Checkout.propTypes = {
  ingredientsList: PropTypes.arrayOf(ingredientType).isRequired,
  extraClass: PropTypes.string,
  buttonHandler: PropTypes.func.isRequired
}

export default Checkout;