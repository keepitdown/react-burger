import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './checkout.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

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

const ingredientObjectShape = PropTypes.shape({
  __v: PropTypes.number,
  _id: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string
});

Checkout.propTypes = {
  ingredientsList: PropTypes.arrayOf(ingredientObjectShape),
  extraClass: PropTypes.string,
  buttonHandler: PropTypes.func.isRequired
}

export default Checkout;