import React, { FC } from 'react';
import styles from './message-bar.module.css';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const MessageBar: FC = () => {
  return (
    <div className={styles.container}>
      <InfoIcon type="primary" />
      <span className="text text_type_main-default ml-2">Выберите булку для Вашего бургера</span>
    </div>
  );
};

export default MessageBar;