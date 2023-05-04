import React, { FC } from 'react';
import styles from './order-ingredients-item.module.css';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderIngredientsItem = {
  itemData: any;
  quantity: number;
};

const OrderIngredientsItem: FC<TOrderIngredientsItem> = ({ itemData, quantity }) => {

  return (
    <div className={styles.container}>
      <IngredientPreview image={itemData.image} name={itemData.name} />
      <p className={styles.title + ' text text_type_main-default ml-4 mr-4'}>{itemData.name}</p>
      <div className={styles.price}>
        <span className='text text_type_digits-default mr-2'>
          {`${itemData.price} x ${quantity}`}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
};

export default OrderIngredientsItem;