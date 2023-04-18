import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TabSelector from '../tab-selector/tab-selector';
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientsCategory from '../ingredients-category/ingredients-category';


function BurgerIngredients({ extraClass }) {

  const defaultTab = 'bun';
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const ingredientsListRef = useRef();
  const categoriesRef = useRef(new Map());

  const getCategoryRef = (categoryName, element) => element && categoriesRef.current.set(categoryName, element);

  const scrollHandler = () => {
    const containerTop = ingredientsListRef.current.getBoundingClientRect().top;
    const closestCategory = Array.from(categoriesRef.current).reduce(
      ([closestName, closestDelta], [categoryName, element]) => {
        const categoryTop = element.getBoundingClientRect().top;
        const delta = Math.abs(categoryTop - containerTop);
        return (delta < closestDelta) ? [categoryName, delta] : [closestName, closestDelta];
      }, [null, Infinity]);
    if (currentTab !== closestCategory) {
      setCurrentTab(closestCategory[0]);
    }
  };

  const tabClickHandler = (categoryName) => {
    const categoryElement = categoriesRef.current.get(categoryName);
    categoryElement.scrollIntoView();
  }

  return (
    <section className={styles.section + (extraClass ? (' ' + extraClass) : '')}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <TabSelector>
        <Tab value="bun" active={currentTab === 'bun'} onClick={() => tabClickHandler('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => tabClickHandler('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={() => tabClickHandler('main')}>
          Начинки
        </Tab>
      </TabSelector>
      <IngredientsList scrollHandler={scrollHandler} ref={ingredientsListRef}>
        <IngredientsCategory categoryName="bun" ref={element => getCategoryRef('bun', element)}>
          Булки
        </IngredientsCategory>
        <IngredientsCategory categoryName="sauce" ref={element => getCategoryRef('sauce', element)}>
          Соусы
        </IngredientsCategory>
        <IngredientsCategory categoryName="main" ref={element => getCategoryRef('main', element)}>
          Начинки
        </IngredientsCategory>
      </IngredientsList>
    </section>
  )
}

BurgerIngredients.propTypes = {
  extraClass: PropTypes.string
};

export default BurgerIngredients;