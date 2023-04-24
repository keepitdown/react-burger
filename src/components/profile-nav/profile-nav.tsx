import React, { FC, ReactNode } from 'react';
import styles from './profile-nav.module.css';

type TProfileNav = {
  children: ReactNode;
}

const ProfileNav: FC<TProfileNav> = ({ children }) => {

  return (
    <ul className={styles.list}>
      {
        Array.isArray(children) ? children.map((item: ReactNode, index) => (
          <li key={index} className={styles['list-item']}>
            {item}
          </li>
        ))
          : (<li>{children}</li>)
      }
    </ul>
  )
};

export default ProfileNav;