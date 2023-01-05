import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './modal-overlay.module.css';

function ModalOverlay({ children, setter }) {

  const modalPortal = useRef(document.getElementById('modal-windows'));

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

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  setter: PropTypes.func.isRequired
};

export default ModalOverlay;