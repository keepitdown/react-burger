import React, {useState, useEffect} from 'react';
import styles from './tab-selector.module.css';

function TabSelector({ children }) {


  return (
    <ul className={styles['tab-selector']}>
      {
        children.map?.((item, index) => (
          <li key={index} >
            {item}
          </li>
          ))
        ?? (<li>{children}</li>)
      }
    </ul>
  )
}

export default TabSelector;