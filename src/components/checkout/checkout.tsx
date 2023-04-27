import React, { FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './checkout.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendOrder, showOrderDetails } from '../../services/actions/order-details';
import { showBunError } from '../../services/actions/burger-constructor';
import { useNavigate } from 'react-router-dom';
import { TAddedIngredients, TConstructorIngredient, TIngredient } from '../../utils/types';

type TCheckout = {
  extraClass?: string;
};

const Checkout: FC<TCheckout> = ({ extraClass }) => {

  const addedIngredients = useSelector<any, TAddedIngredients>(state => state.burgerConstructor.data);

  const { userIsLoggedIn, authIsChecked } = useSelector<any, { userIsLoggedIn: boolean, authIsChecked: boolean }>(state => ({
    userIsLoggedIn: state.auth.userIsLoggedIn,
    authIsChecked: state.auth.authIsChecked
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (!userIsLoggedIn) {
      navigate('/login', { state: { originalPath: '/' } });
    } else {
      if (addedIngredients.bun) {
        dispatch(showOrderDetails());
        dispatch<any>(sendOrder());
      } else {
        dispatch(showBunError());
      }
    }
  }

  const totalPrice = useMemo<number>(
    () => [addedIngredients.bun, ...addedIngredients.middle, addedIngredients.bun].reduce(
      (total: number, currentItem: TIngredient | TConstructorIngredient | null) => currentItem ? (total + currentItem.price) : total
      , 0)
    , [addedIngredients]);

  return (
    <div className={styles.container + (extraClass ? (' ' + extraClass) : '')}>
      <div className={styles['total-price'] + ' mr-10'}>
        <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        disabled={!authIsChecked}
        onClick={handleClick}
      >
        Оформить заказ
      </Button>
    </div>
  )
};

export default Checkout;