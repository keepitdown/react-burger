import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ children, setter }) {

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      setter(false)
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
  setter: PropTypes.func.isRequired
};

export default ModalOverlay;