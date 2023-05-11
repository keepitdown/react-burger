import React, { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import styles from './checkout.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendOrder, showOrderConfirmation } from '../../services/actions/order-confirmation';
import { showBunError } from '../../services/actions/burger-constructor';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

type TCheckout = {
  extraClass?: string;
};

const Checkout: FC<TCheckout> = ({ extraClass }) => {

  const addedIngredients = useSelector(state => state.burgerConstructor.data);

  const { userIsLoggedIn, authIsChecked, sendingData } = useSelector(state => ({
    userIsLoggedIn: state.auth.userIsLoggedIn,
    authIsChecked: state.auth.authIsChecked,
    sendingData: state.OrderConfirmation.sendingData,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (!userIsLoggedIn) {
      navigate('/login', { state: { originalPath: '/' } });
    } else {
      if (addedIngredients.bun) {
        dispatch(showOrderConfirmation());
        dispatch(sendOrder());
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
        disabled={!authIsChecked || sendingData}
        onClick={handleClick}
        extraClass={styles.button}
      >
        {!sendingData ? (<>Оформить заказ</>) : (<>Отправка...</>)}
      </Button>
    </div>
  )
};

export default Checkout;