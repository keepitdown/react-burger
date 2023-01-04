import React, {useState, useEffect} from 'react';
import styles from './burger-ingridients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TabSelector from '../tab-selector/tab-selector';
import IngridientsList from '../ingridients-list/ingridients-list';
import IngridientsCategory from '../ingridients-category/ingridients-category';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


function BurgerIngridients({ingridientsData, extraClass}) {

  const defaultTab = 'bun';

  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  const showDetails = (ingredientData) => {
    setSelectedIngredient({...ingredientData});
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
        <IngridientsList>
          <IngridientsCategory categoryData={ingridientsData.bun} clickHandler={showDetails}>
            Булки
          </IngridientsCategory>
          <IngridientsCategory categoryData={ingridientsData.sauce} clickHandler={showDetails}>
            Соусы
          </IngridientsCategory>
          <IngridientsCategory categoryData={ingridientsData.main} clickHandler={showDetails}>
            Начинки
          </IngridientsCategory>
        </IngridientsList>
      </section>
      {modalIsOpen && (
      <ModalOverlay setter={setModalIsOpen}>
          <Modal header="Детали ингредиента" setter={setModalIsOpen}>
            <IngredientDetails ingredientData={selectedIngredient} />
          </Modal>
        </ModalOverlay>
      )}
    </>
  )
}

export default BurgerIngridients;