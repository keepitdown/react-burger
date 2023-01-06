import React from 'react';
import PropTypes from 'prop-types';
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

NavBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  firstRightItem: PropTypes.number
};

export default NavBar;