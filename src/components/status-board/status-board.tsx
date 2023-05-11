import React, { FC, ReactNode } from 'react';
import styles from './status-board.module.css';

type TStatusBoard = {
  children: ReactNode
  extraClass?: string;
};

const StatusBoard: FC<TStatusBoard> = ({ children, extraClass }) => {

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
};

export default StatusBoard;