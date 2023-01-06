import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientCard({ data, quantity, isEven, clickHandler }) {

  return (
    <li className={styles.container + (isEven ? ' ml-6' : '')} onClick={() => clickHandler(data)}>
      {!!quantity && <Counter count={quantity} size="default" />}
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
  data: PropTypes.shape({
    __v: PropTypes.number,
    _id: PropTypes.string,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string
    }),
  quantity: PropTypes.number,
  isEven: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default IngredientCard;