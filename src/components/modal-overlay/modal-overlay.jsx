import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ children, closeHandler }) {

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler();
    }
  }

  return (
    <div className={styles.overlay} onClick={handleClick}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeHandler: PropTypes.func.isRequired
};

export default ModalOverlay;