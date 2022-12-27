import React, {useState, useEffect} from 'react';
import styles from './burger-ingridients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TabSelector from '../tab-bar/tab-selector';

function BurgerIngridients(props) {

  return (
    <section className={styles.section}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <TabSelector defaultSelection="one">
      <Tab value="one">
        One
      </Tab>
      <Tab value="two">
        Two
      </Tab>
      </TabSelector>
    </section>
  )
}

export default BurgerIngridients;