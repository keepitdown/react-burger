import React, { FC } from 'react';
import styles from './value-item.module.css';

type TValueItem = {
  children: string;
  value: string | number;

}

const ValueItem: FC<TValueItem> = ({ children, value }) => {

  return (
    <div className={styles['container']}>
      <h4 className="text text_type_main-default text_color_inactive">{children}</h4>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </div>
  );
};

export default ValueItem;