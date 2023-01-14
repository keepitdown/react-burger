import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TabSelector from '../tab-selector/tab-selector';
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


function BurgerIngredients({ extraClass }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const defaultTab = 'bun';

  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  const showDetails = (ingredientData) => {
    setSelectedIngredient({ ...ingredientData });
    setModalIsOpen(true);
  }

  return (
    <>
      <section className={styles.section + (extraClass ? (' ' + extraClass) : '')}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <TabSelector>
          <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
            Начинки
          </Tab>
        </TabSelector>
        <IngredientsList>
          <IngredientsCategory categoryName="bun" clickHandler={showDetails}>
            Булки
          </IngredientsCategory>
          <IngredientsCategory categoryName="sauce" clickHandler={showDetails}>
            Соусы
          </IngredientsCategory>
          <IngredientsCategory categoryName="main" clickHandler={showDetails}>
            Начинки
          </IngredientsCategory>
        </IngredientsList>
      </section>
      {modalIsOpen && (
        <Modal header="Детали ингредиента" setter={setModalIsOpen}>
          <IngredientDetails ingredientData={selectedIngredient} />
        </Modal>
      )}
    </>
  )
}

BurgerIngredients.propTypes = {
  extraClass: PropTypes.string
};

export default BurgerIngredients;