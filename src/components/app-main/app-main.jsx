import React, {useState, useEffect} from 'react';
import styles from './app-main.module.css';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {testData as burgerData} from '../../data/mockBurgerData'

function AppMain({ ingridientsData }) {

  return (
    <main className={styles.main}>
      <BurgerIngridients ingridientsData={ingridientsData}/>
      <BurgerConstructor selectedIngridients={burgerData}  extraClass="ml-10"/>
    </main>
  )
}

export default AppMain;