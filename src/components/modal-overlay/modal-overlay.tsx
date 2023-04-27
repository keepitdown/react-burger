import React, { FC, ReactNode, SyntheticEvent } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
  children: ReactNode;
  closeHandler: () => any;
};

const ModalOverlay: FC<TModalOverlay> = ({ children, closeHandler }) => {

  const handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeHandler();
    }
  }

  return (
    <div className={styles.overlay} onClick={handleClick}>
      {children}
    </div>
  )
};

export default ModalOverlay;