import React, {useEffect, useState, useRef} from 'react';
import { createPortal } from 'react-dom';
import styles from './modal-overlay.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function ModalOverlay({ children, setter }) {

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

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      setter(false)
    }
  }

  return createPortal((
    <div className={styles.overlay} onClick={handleClick}>
      {children}
    </div>
  ), modalPortal.current)
}

export default ModalOverlay;