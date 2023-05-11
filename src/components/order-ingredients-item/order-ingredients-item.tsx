import React, { FC } from 'react';
import styles from './order-ingredients-item.module.css';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderIngredient } from '../../utils/types';

type TOrderIngredientsItem = {
  itemData: TOrderIngredient;
};

const OrderIngredientsItem: FC<TOrderIngredientsItem> = ({ itemData }) => {

  const {ingredient, quantity} = itemData;

  return (
    <div className={styles.container}>
      <IngredientPreview image={ingredient.image} name={ingredient.name} />
      <p className={styles.title + ' text text_type_main-default ml-4 mr-4'}>{ingredient.name}</p>
      <div className={styles.price}>
        <span className='text text_type_digits-default mr-2'>
          {`${ingredient.price} x ${quantity}`}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
};

export default OrderIngredientsItem;