import React, { FC, ReactNode, SyntheticEvent } from 'react';
import styles from './profile-nav-button.module.css';

type TProfileNavButton = {
  children: ReactNode;
  clickHandler: (e?: SyntheticEvent) => any;
}

const ProfileNavButton: FC<TProfileNavButton> = ({ children, clickHandler }) => {

  return (
    <button
      className={styles.button + ' text text_type_main-medium text_color_inactive'}
      type="button"
      onClick={clickHandler}
    >
      {children}
    </button>
  )
};

export default ProfileNavButton;