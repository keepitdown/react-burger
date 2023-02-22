import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './checkout.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendOrder, SHOW_ORDER_DETAILS } from '../../services/actions/order-details';
import { SHOW_BUN_ERROR } from '../../services/actions/burger-constructor';

function Checkout({ extraClass }) {

  const ingredientsList = useSelector(state => state.burgerConstructor.data);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (Object.keys(ingredientsList.bun).length) {
      dispatch({ type: SHOW_ORDER_DETAILS });
      dispatch(sendOrder());
    } else {
      dispatch({ type: SHOW_BUN_ERROR});
    }
  }

  const totalPrice = useMemo(
    () => [ingredientsList.bun, ...ingredientsList.middle, ingredientsList.bun].reduce(
      (total, currentItem) => (!!currentItem.price && currentItem.price) + total
      , 0)
    , [ingredientsList]);

  return (
    <div className={styles.container + (extraClass ? (' ' + extraClass) : '')}>
      <div className={styles['total-price'] + ' mr-10'}>
        <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={handleClick}>
        Оформить заказ
      </Button>
    </div>
  )
}

Checkout.propTypes = {
  extraClass: PropTypes.string,
}

export default Checkout;