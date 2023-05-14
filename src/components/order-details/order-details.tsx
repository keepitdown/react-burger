import React, { FC } from 'react';
import styles from './order-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderIngredients from '../order-ingredients/order-ingredients';
import { created, done, pending } from '../../utils/constants';
import { TIngredient, TOrder, TOrderIngredient } from '../../utils/types';
import { useSelector } from '../../services/hooks';
import { FormattedDate } from '../formatted-date/formatted-date';
import { getIngredientById } from '../../utils/functions';

type TOrderDetails = {
  orderData: TOrder;
  modal?: boolean;
};

const OrderDetails: FC<TOrderDetails> = ({ orderData, modal }) => {

  const availableIngredients = useSelector(state => state.burgerIngredients.data);

  const ingredientsData = orderData.ingredients.reduce<TOrderIngredient[]>((result, ingredientId) => {
    const duplicateIndex = result.findIndex(resultItem => resultItem.ingredient._id === ingredientId);
    if (duplicateIndex >= 0) {
      const duplicate = result[duplicateIndex];
      const updatedDuplicate = { ...duplicate, quantity: duplicate.quantity + 1 };
      let updatedResult = [...result];
      updatedResult.splice(duplicateIndex, 1, updatedDuplicate)
      return updatedResult;
    } else {
      const ingredientData = getIngredientById(availableIngredients, ingredientId);
      if (!ingredientData) {
        return result;
      }
      return [...result, { ingredient: ingredientData, quantity: 1 }];
    }
  }, []);

  const totalPrice = ingredientsData.reduce<number>(
    (total, { ingredient, quantity }) => total + (ingredient.price * quantity)
, 0);

  return (
    <div className={styles.container + (modal ? ' mt-5 mb-10' : ' mt-10 mb-10')}>
      <p className={'text text_type_main-medium' + (modal ? ' mb-2' : ' mb-3')}>{orderData.name}</p>
      <p className={'text text_type_main-default mb-15'}>
        {(orderData.status === done) && (<span className={styles['status-done']}>Выполнен</span>)}
        {(orderData.status === pending) && (<>Готовится</>)}
        {(orderData.status === created) && (<>Создан</>)}
      </p>
      <OrderIngredients orderData={ingredientsData} />
      <div className={styles['order-info'] + ' mt-10'}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(orderData.createdAt)}
        />
        <div className={styles['total-price']}>
          <span className='text text_type_digits-default mr-2'>
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
};

export default OrderDetails;