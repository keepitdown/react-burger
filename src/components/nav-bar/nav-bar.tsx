import React, { FC, ReactNode } from 'react';
import styles from './nav-bar.module.css';

type TNavBar = {
  children: ReactNode;
  firstRightItem?: number;
};

const NavBar: FC<TNavBar> = ({ children, firstRightItem }) => {

  return (
    <nav className={styles['nav-bar']}>
      <ul className={styles.list}>
        {
          Array.isArray(children) ? children.map((item: ReactNode, index) => (
            <li
              key={index}
              className={
                (firstRightItem && (index < (firstRightItem - 1)) ? 'mr-2' : '')
                + (firstRightItem && (index > (firstRightItem - 1)) ? 'ml-2' : '')
                + (firstRightItem && (index === (firstRightItem - 1)) ? styles['list-item_first-right'] : '')
              }
            >
              {item}
            </li>
          ))
            : (<li>{children}</li>)
        }
      </ul>
    </nav>
  )
};

export default NavBar;