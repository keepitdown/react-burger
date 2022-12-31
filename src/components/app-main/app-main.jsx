import React, {useState, useEffect} from 'react';
import styles from './app-main.module.css';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';

function AppMain({ ingridientsData }) {

  return (
    <main className={styles.main}>
      <BurgerIngridients ingridientsData={ingridientsData} />
    </main>
  )
}

export default AppMain;