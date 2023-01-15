import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/types';
import { SET_INGREDIENT_DETAILS, SHOW_DETAILS } from '../../services/actions/ingredient-details';
import { DECREASE_INGREDIENT_QUANTITY, INCREASE_INGREDIENT_QUANTITY } from '../../services/actions/burger-ingredients';

function IngredientCard({ data, isEven }) {

  const selectedBun = useSelector(state => state.burgerConstructor.data.bun);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch({
      type: SET_INGREDIENT_DETAILS,
      data
    });
    dispatch({ type: SHOW_DETAILS });
  }

  const addBtnHandler = (data) => {

    if (data.type === 'bun') {
      dispatch({
        type: INCREASE_INGREDIENT_QUANTITY,
        id: data._id,
        increaseAmount: 2
      });
      Object.keys(selectedBun).length &&
        dispatch({
          type: DECREASE_INGREDIENT_QUANTITY,
          id: selectedBun._id,
          decreaseAmont: 2
        });
    } else {
      dispatch({
        type: INCREASE_INGREDIENT_QUANTITY,
        id: data._id,
        increaseAmount: 1
      });
    }
    dispatch({ type: 'ADD_CONSTRUCTOR_INGREDIENT', data })
  }

  return (
    <li className={styles.container + (isEven ? ' ml-6' : '')} onClick={clickHandler}>
      {!!data.quantity && <Counter count={data.quantity} size="default" />}
      <img src={data.image} alt={data.name} className={styles.image + ' pl-4 pr-4'} />
      <div className={styles['price-tag'] + ' mt-1 mb-1'}>
        <p className="text text_type_digits-default mr-2">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={styles['ingredient-name'] + ' text text_type_main-default'}>{data.name}</h3>
      <button onClick={() => addBtnHandler(data)}>Add</button>
    </li>
  )
}

IngredientCard.propTypes = {
  data: ingredientType.isRequired,
  isEven: PropTypes.bool.isRequired
};

export default IngredientCard;