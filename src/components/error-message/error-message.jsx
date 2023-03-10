import React from 'react';
import PropTypes from 'prop-types';
import styles from './error-message.module.css';

function ErrorMessage({ children }) {
  return (
    <main className={styles.container}>
      <section>
        <h1 className="text text_type_main-medium text_color_inactive">Ошибка</h1>
        <p className="text text_type_main-default text_color_inactive mt-6">{children}</p>
      </section>
    </main>
  )
}

ErrorMessage.propTypes = {
  children: PropTypes.string
};

export default ErrorMessage;