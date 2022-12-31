import React, {useState, useEffect} from 'react';
import styles from './nav-bar.module.css';

function NavBar({ children, firstRightItem }) {

  return (
    <nav className={styles['nav-bar']}>
      <ul className={styles.list}>
        {
          children.map?.((item, index) => (
            <li
              key={index}
              className={
                (index < (firstRightItem - 1) ? 'mr-2' : '')
                + (index > (firstRightItem - 1) ? 'ml-2' : '')
                + (index === (firstRightItem - 1) ? (' ' + styles['list-item_first-right']) : '')
              }
            >
              {item}
            </li>
            ))
          ?? (<li>{children}</li>)
        }
      </ul>
    </nav>
  )
}

export default NavBar;