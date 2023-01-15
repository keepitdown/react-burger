import React from 'react';
import styles from './app-main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function AppMain() {

  return (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor extraClass="ml-10" />
    </main>
  )
}

export default AppMain;