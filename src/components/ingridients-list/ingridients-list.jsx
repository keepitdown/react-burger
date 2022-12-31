import React, {useState, useEffect} from 'react';
import styles from './ingridients-list.module.css';

function IngridientsList({ children }) {

  return (
    <div className={styles.container + " mt-10 custom-scroll"}>
      {children}
    </div>
  )
}

export default IngridientsList;