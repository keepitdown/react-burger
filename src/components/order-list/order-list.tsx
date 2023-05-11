import React, { FC, ReactNode } from 'react';
import styles from './order-list.module.css';

type TOrderList = {
  children?: ReactNode;
  extraClass?: string;
};

const OrderList: FC<TOrderList> = ({ children, extraClass }) => {

  
  return (
    <div className={styles.container + ' custom-scroll' + (extraClass ? (' ' + extraClass) : '')}>
      {children}
    </div>
  )
};

export default OrderList;