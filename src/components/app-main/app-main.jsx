import React from 'react';
import PropTypes from 'prop-types';
import styles from './app-main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ingredientType from '../../utils/types';

import {testData as burgerData} from '../../data/test-burger-data'

function AppMain({ ingredientsData }) {

  return (
    <main className={styles.main}>
      <BurgerIngredients ingredientsData={ingredientsData}/>
      <BurgerConstructor selectedIngredients={burgerData}  extraClass="ml-10"/>
    </main>
  )
}

AppMain.propTypes = {
  ingredientsData: PropTypes.objectOf(
    PropTypes.arrayOf(ingredientType)).isRequired};

export default AppMain;