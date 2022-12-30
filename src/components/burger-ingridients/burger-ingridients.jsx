import React, {useState, useEffect} from 'react';
import styles from './burger-ingridients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TabSelector from '../tab-bar/tab-selector';
import IngridientsList from '../ingridients-list/ingridients-list';
import IngridientCategory from '../ingridients-category/ingridients-category';
import IngridientsCategory from '../ingridients-category/ingridients-category';


function BurgerIngridients({ingridientsData, extraClass}) {

  const defaultTab = 'bun';

  const [current, setCurrent] = useState(defaultTab);

  return (
    <section className={styles.section + (extraClass ? (' ' + extraClass) : '')}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <TabSelector>
      <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
      </TabSelector>
      <IngridientsList>
        <IngridientsCategory categoryData={ingridientsData.bun}>Булки</IngridientsCategory>
      </IngridientsList>
    </section>
  )
}

export default BurgerIngridients;