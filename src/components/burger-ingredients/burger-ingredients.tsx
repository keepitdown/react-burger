import React, { FC, useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TabSelector from '../tab-selector/tab-selector';
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientsCategory from '../ingredients-category/ingredients-category';

type TBurgerIngredients = {
  extraClass?: string;
};

const BurgerIngredients: FC<TBurgerIngredients> = ({ extraClass }) => {

  const defaultTab = 'bun';
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const ingredientsListRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef(new Map<string, HTMLElement>());

  const getCategoryRef = (categoryName: string, element: HTMLElement): void => { element && categoriesRef.current.set(categoryName, element) };

  const scrollHandler = (): void => {
    const containerTop = ingredientsListRef.current!.getBoundingClientRect().top;
    const closestCategory = Array.from(categoriesRef.current).reduce<[string, number]>(
      ([closestName, closestDelta], [categoryName, element]) => {
        const categoryTop = element.getBoundingClientRect().top;
        const delta = Math.abs(categoryTop - containerTop);
        return (delta < closestDelta) ? [categoryName, delta] : [closestName, closestDelta];
      }, ['', Infinity]);
    if (currentTab !== closestCategory[0]) {
      setCurrentTab(closestCategory[0]);
    }
  };

  const tabClickHandler = (categoryName: string): void => {
    const categoryElement = categoriesRef.current.get(categoryName);
    categoryElement && categoryElement.scrollIntoView();
  }

  return (
    <section className={styles.section + (extraClass ? (' ' + extraClass) : '')}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <TabSelector>
        <Tab value="bun" active={currentTab === 'bun'} onClick={(): void => { tabClickHandler('bun') }}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={(): void => { tabClickHandler('sauce') }}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={(): void => { tabClickHandler('main') }}>
          Начинки
        </Tab>
      </TabSelector>
      <IngredientsList scrollHandler={scrollHandler} ref={ingredientsListRef}>
        <IngredientsCategory categoryName="bun" ref={(element: HTMLElement): void => { getCategoryRef('bun', element) }}>
          Булки
        </IngredientsCategory>
        <IngredientsCategory categoryName="sauce" ref={(element: HTMLElement): void => { getCategoryRef('sauce', element) }}>
          Соусы
        </IngredientsCategory>
        <IngredientsCategory categoryName="main" ref={(element: HTMLElement): void => { getCategoryRef('main', element) }}>
          Начинки
        </IngredientsCategory>
      </IngredientsList>
    </section>
  )
};

export default BurgerIngredients;