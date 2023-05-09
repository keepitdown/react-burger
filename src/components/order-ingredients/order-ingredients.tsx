import React, { FC } from 'react';
import styles from './order-ingredients.module.css';
import OrderIngredientsItem from '../order-ingredients-item/order-ingredients-item';
import { TOrderIngredient } from '../../utils/types';


type TOrderIngredients = {
  orderData: TOrderIngredient[];
};

const OrderIngredients: FC<TOrderIngredients> = ({ orderData }) => {

  return (
    <>
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <ul className={styles.list + ' custom-scroll'}>
        {orderData.map((item, index) => (
          <li key={item.ingredient._id} className={styles['list-item'] + ' mr-8' + ((index > 0) ? ' mt-4' : '')}>
            <OrderIngredientsItem itemData={item} />
          </li>
        ))}
      </ul>
    </>
  )
};

export default OrderIngredients;