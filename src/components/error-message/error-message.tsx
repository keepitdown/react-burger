import React, { FC } from 'react';
import styles from './error-message.module.css';

type TErrorMessage = {
  children?: string;
};

const ErrorMessage: FC<TErrorMessage> = ({ children }) => {
  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-medium text_color_inactive">Ошибка</h1>
      <p className="text text_type_main-default text_color_inactive mt-6">{children}</p>
    </section>
  )
};

export default ErrorMessage;