import React, {useState, useEffect} from 'react';
import styles from './ingridient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngridientCard({ data, quantity, isEven, clickHandler }) {

  return (
    <li className={styles.container + (isEven ? ' ml-6' : '')} onClick={() => clickHandler(data)}>
      {!!quantity && <Counter count={quantity} size="default" />}
      <img src={data.image} alt={data.name} className={styles.image + ' pl-4 pr-4'} />
      <div className={styles['price-tag'] + ' mt-1 mb-1'}>
        <p className="text text_type_digits-default mr-2">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={styles['ingridient-name'] + ' text text_type_main-default'}>{data.name}</h3>
    </li>
  )
}

export default IngridientCard;