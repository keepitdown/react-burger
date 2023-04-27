import React, { FC } from 'react';
import styles from './order-error.module.css';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderError: FC = () => {

  return (
    <>
      <h2 className="text text_type_main-large mb-9">Ошибка</h2>
      <div className={styles['info-icon']}><InfoIcon type="primary" /></div>
      <p className="text text_type_main-default mt-9">Не удалось отправить заказ</p>
      <p className="text text_type_main-default text_color_inactive mt-8 mb-20">Попробуйте снова</p>
    </>
  )
};

export default OrderError;