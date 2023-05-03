import React, { FC } from 'react';
import styles from './status-board-group.module.css';

type TStatusBoardGroup = {
  children: string;
  orderIds: string[];
  highlight?: boolean;
  extraClass?: string;
};

const StatusBoardGroup: FC<TStatusBoardGroup> = ({ children, orderIds, highlight, extraClass }) => {

  return (
    <div className={styles.container + (extraClass ? (' ' + extraClass) : '')}>
      <h2 className="text text_type_main-medium mb-6">
        {children}
      </h2>
      <ol className={styles.list + ' text text_type_digits-default' + (highlight ? (' ' + styles['highlight-color']) : '')}>
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