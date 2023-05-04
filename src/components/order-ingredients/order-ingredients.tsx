import React, { FC } from 'react';
import styles from './order-ingredients.module.css';
import OrderIngredientsItem from '../order-ingredients-item/order-ingredients-item';


type TOrderIngredients = {
  orderData: any[];
};

const OrderIngredients: FC<TOrderIngredients> = ({ orderData }) => {

  return (
    <>
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <ul className={styles.list + ' custom-scroll'}>
        {orderData.map((item, index) => (
          <li className={styles['list-item'] + ' mr-8' + ((index > 0) ? ' mt-4' : '')}>
            <OrderIngredientsItem itemData={item} quantity={2} />
          </li>
        ))}
      </ul>
    </>
  )
};

export default OrderIngredients;