import React, {useState, useEffect} from 'react';
import styles from './NavBar.module.css';

function NavBar({ children, position }) {

  return (
    <nav>
      <ul className={styles.list + ' ' + styles[position]}>
        {
          children.map?.((item, index) => (<li key={index} className="mr-2">{item}</li>))
            ?? (<li className="mr-2">{children}</li>)
        }
      </ul>
    </nav>
  )
}

export default NavBar;