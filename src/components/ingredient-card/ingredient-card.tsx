import React, { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, TIngredientsItemDragData } from '../../utils/types';
import { addedIngredient } from '../../utils/constants';

type TIngredientCard = {
  data: TIngredient;
  isEven?: boolean;
};

const IngredientCard: FC<TIngredientCard> = ({ data, isEven }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = (): void => {
    navigate(`ingredients/${data._id}`, { state: { background: location } });
  };

  const [, dragRef, preview] = useDrag<TIngredientsItemDragData>({
    type: addedIngredient,
    item: { id: data._id }
  });

  useEffect(() => {
    preview(getEmptyImage())
  }, []);


  return (
    <li className={styles.container + (isEven ? ' ml-6' : '')} onClick={clickHandler} ref={dragRef}>
      {!!data.quantity && <Counter count={data.quantity} size="default" />}
      <img src={data.image} alt={data.name} className={styles.image + ' pl-4 pr-4'} />
      <div className={styles['price-tag'] + ' mt-1 mb-1'}>
        <p className="text text_type_digits-default mr-2">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={styles['ingredient-name'] + ' text text_type_main-default'}>{data.name}</h3>
    </li>
  );
};

export default IngredientCard;