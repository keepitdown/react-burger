import React, {useState, useEffect} from 'react';
import styles from './app-main.module.css';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';

function AppMain(props) {

  return (
    <main className={styles.main}>
      <BurgerIngridients />
    </main>
  )
}

export default AppMain;