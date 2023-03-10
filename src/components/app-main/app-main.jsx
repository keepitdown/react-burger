import React from 'react';
import styles from './app-main.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import DragLayer from '../drag-layer/drag-layer';

function AppMain() {

  return (
    <main className={styles.main + ' pt-1 pb-1'}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor extraClass="ml-10" />
        <DragLayer />
      </DndProvider>
    </main>
  )
}

export default AppMain;