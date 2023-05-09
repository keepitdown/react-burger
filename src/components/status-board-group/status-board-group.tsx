import React, { FC } from 'react';
import styles from './status-board-group.module.css';
import { done, pending } from '../../utils/constants';
import { TOrder } from '../../utils/types';

type TStatusBoardGroup = {
  orders: TOrder[] | null;
  status: typeof done | typeof pending;
  extraClass?: string;
};

const StatusBoardGroup: FC<TStatusBoardGroup> = ({ orders, status, extraClass }) => {

  return (
    <div className={styles.container + (extraClass ? (' ' + extraClass) : '')}>
      <h2 className="text text_type_main-medium mb-6">
        {(status === done) && (<>Готовы:</>)}
        {(status === pending) && (<>В работе:</>)}
      </h2>
      <ol className={styles.list + ' text text_type_digits-default' + ((status === done) ? (' ' + styles['status-done']) : '')}>
        {orders && orders.slice(0, 30).map((item) => (
          <li
            key={item.number}
            className={styles['list-item']}
          >
            {item.number}
          </li>
        ))}
      </ol>
    </div>
  )
};

export default StatusBoardGroup;