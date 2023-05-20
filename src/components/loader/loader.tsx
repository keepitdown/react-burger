import React, { FC } from 'react';
import styles from './loader.module.css';

type TLoader = {
  children: string;
  extraClass?: string;
};

const Loader: FC<TLoader> = ({ children, extraClass }) => {

  return (
    <div className={styles.container + (extraClass ? (' ' + extraClass) : '')}>
      <h2 className="text text_type_main-large">{children}</h2>
      <div className={styles['animation-container']}>
        <div className={styles['animation-element']}></div>
      </div>
    </div>
  )
};

export default Loader;