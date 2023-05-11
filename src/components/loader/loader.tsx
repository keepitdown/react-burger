import React, { FC } from 'react';
import styles from './loader.module.css';

const Loader: FC = () => {

  return (
    <>
      <h2 className="text text_type_main-large">Отправка заказа</h2>
      <div className={styles['animation-container']}>
        <div className={styles['animation-element']}></div>
      </div>
    </>
  )
};

export default Loader;