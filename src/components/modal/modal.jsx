import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal({ children, header, setter }) {
  return (
    <div className={styles.container}>
      <div className={styles.header + ' mt-10 ml-10 mr-10'}>
        {header && (<h2 className={styles.heading + ' text text_type_main-large'}>{header}</h2>)}
        <button
          className={styles['close-button'] + ' close-modal-btn'}
          onClick={() => setter(false)}
        >
          <CloseIcon type="primary" /></button>
      </div>
      {children}
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  setter: PropTypes.func.isRequired
};

export default Modal;