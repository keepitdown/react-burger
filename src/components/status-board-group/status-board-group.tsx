import React, { FC } from 'react';
import styles from './status-board-group.module.css';
import { done, pending } from '../../utils/constants';

type TStatusBoardGroup = {
  orderIds: string[];
  status: typeof done | typeof pending;
  extraClass?: string;
};

const StatusBoardGroup: FC<TStatusBoardGroup> = ({ orderIds, status, extraClass }) => {

  return (
    <div className={styles.container + (extraClass ? (' ' + extraClass) : '')}>
      <h2 className="text text_type_main-medium mb-6">
        {(status === done) && (<>Готовы:</>)}
        {(status === pending) && (<>В работе:</>)}
      </h2>
      <ol className={styles.list + ' text text_type_digits-default' + ((status === done) ? (' ' + styles['status-done']) : '')}>
        {orderIds.map((item) => (
          <li
            key={item}
            className={styles['list-item']}
          >
            {item}
          </li>
        ))}
      </ol>
    </div>
  )
};

export default StatusBoardGroup;