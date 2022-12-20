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
              className={'mr-2' + (index === (Number(firstRightItem) - 1) ? (' ' + styles['list-item_first-right']) : '')}
            >
              {item}
            </li>
            ))
          ?? (<li className="mr-2">{children}</li>)
        }
      </ul>
    </nav>
  )
}

export default NavBar;