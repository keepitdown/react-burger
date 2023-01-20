import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/types';
import { SET_INGREDIENT_DETAILS, SHOW_DETAILS } from '../../services/actions/ingredient-details';

function IngredientCard({ data, isEven }) {

  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch({
      type: SET_INGREDIENT_DETAILS,
      data
    });
    dispatch({ type: SHOW_DETAILS });
  }

  const [, dragRef] = useDrag({
    type: 'added-ingredient',
    item: { id: data._id }
  });

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
  )
}

IngredientCard.propTypes = {
  data: ingredientType.isRequired,
  isEven: PropTypes.bool.isRequired
};

export default IngredientCard;