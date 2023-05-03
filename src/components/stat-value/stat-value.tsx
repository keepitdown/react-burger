import React, { FC, useState } from 'react';
import styles from './stat-value.module.css';

type TStatValue = {
  children: string;
  value: number;
  extraClass?: string;
};

const StatValue: FC<TStatValue> = ({ children, value, extraClass }) => {

  return (
    <div className={(extraClass ? extraClass : '')}>
      <h2 className="text text_type_main-medium">{children}</h2>
      <p className={styles.value + ' text text_type_digits-large'}>{value.toLocaleString('ru-RU')}</p>
    </div>
  )
};

export default StatValue;