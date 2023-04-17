import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from 'react-redux';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import DragLayer from '../components/drag-layer/drag-layer';
import ErrorMessage from '../components/error-message/error-message';
import { changePageTitle } from '../utils/functions';

function ConstructorPage() {

  useEffect(() => changePageTitle('Конструктор'), []);

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    !requestHasFailed
      ? (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor extraClass="ml-10" />
          <DragLayer />
        </DndProvider>
      )
      : (<ErrorMessage>Не удалось установить связь с сервером</ErrorMessage>)
  );
}

export default ConstructorPage;