import React from 'react';
import PropTypes from 'prop-types';
import styles from './app-main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {testData as burgerData} from '../../data/mockBurgerData'

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
    PropTypes.arrayOf(
      PropTypes.shape({
        __v: PropTypes.number,
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string
        })))};

export default AppMain;