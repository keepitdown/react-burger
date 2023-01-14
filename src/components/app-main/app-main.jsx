import React from 'react';
import PropTypes from 'prop-types';
import styles from './app-main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {testData as burgerData} from '../../data/test-burger-data'

function AppMain() {

  return (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor selectedIngredients={burgerData}  extraClass="ml-10"/>
    </main>
  )
}

export default AppMain;