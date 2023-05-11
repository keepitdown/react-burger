import React, { FC, useEffect } from 'react';
import { useSelector } from '../services/hooks';
import ErrorMessage from '../components/error-message/error-message';
import IngredientSection from '../components/ingredient-section/ingredient-section';
import { changePageTitle } from '../utils/functions';

const IngredientPage: FC = () => {

  useEffect(() => changePageTitle('Детали ингредиента'), []);

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    !requestHasFailed
      ? (
        <IngredientSection />
      )
      : (<ErrorMessage>Не удалось установить связь с сервером</ErrorMessage>)
  );
}

export default IngredientPage;