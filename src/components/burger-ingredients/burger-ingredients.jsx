import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TabSelector from '../tab-selector/tab-selector';
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { REMOVE_INGREDIENT_DETAILS, HIDE_DETAILS } from '../../services/actions/ingredient-details';


function BurgerIngredients({ extraClass }) {

  const defaultTab = 'bun';
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const modalIsOpen = useSelector(state => state.ingredientDetails.showDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const handleModalClose = () => {
    dispatch({ type: HIDE_DETAILS });
    dispatch({ type: REMOVE_INGREDIENT_DETAILS });
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
          <IngredientsCategory categoryName="bun">
            Булки
          </IngredientsCategory>
          <IngredientsCategory categoryName="sauce">
            Соусы
          </IngredientsCategory>
          <IngredientsCategory categoryName="main">
            Начинки
          </IngredientsCategory>
        </IngredientsList>
      </section>
      {modalIsOpen && (
        <Modal header="Детали ингредиента" closeHandler={handleModalClose}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  )
}

BurgerIngredients.propTypes = {
  extraClass: PropTypes.string
};

export default BurgerIngredients;