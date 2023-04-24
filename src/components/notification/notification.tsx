import React, { FC } from 'react';
import styles from './notification.module.css';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TNotification = {
  children: string;
};

const Notification: FC<TNotification> = ({ children }) => {
  return (
    <div className={styles.container}>
      <InfoIcon type="primary" />
      <span className="text text_type_main-default ml-2">{children}</span>
    </div>
  );
};

export default Notification;