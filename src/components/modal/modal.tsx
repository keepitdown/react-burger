import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TModal = {
  children: ReactNode;
  header?: ReactNode;
  closeHandler: () => any;
}

const Modal: FC<TModal> = ({ children, header, closeHandler }) => {

  const modalPortal = useRef(document.getElementById('modal-windows') as HTMLDivElement);

  const closeWithEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    window.addEventListener('keydown', closeWithEsc);
    return () => window.removeEventListener('keydown', closeWithEsc);
  }, [closeWithEsc]);

  return createPortal((
    <ModalOverlay closeHandler={closeHandler}>
      <div className={styles.container}>
        <div className={styles.header + ' mt-10 ml-10 mr-10'}>
          {header && (<h2 className={'text text_type_main-large'}>{header}</h2>)}
          <button
            className={styles['close-button'] + ' close-modal-btn'}
            onClick={closeHandler}
          >
            <CloseIcon type="primary" /></button>
        </div>
        {children}
      </div>
    </ModalOverlay>
  ), modalPortal.current)
};

export default Modal;