import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({ children, header, setter }) {

  const modalPortal = useRef(document.getElementById('modal-windows'));

  const closeWithEsc = (e) => {
    if (e.key === 'Escape') {
      setter(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', closeWithEsc);
    return () => window.removeEventListener('keydown', closeWithEsc);
  }, []);

  return createPortal((
    <ModalOverlay setter={setter}>
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
    </ModalOverlay>
  ), modalPortal.current)
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  setter: PropTypes.func.isRequired
};

export default Modal;