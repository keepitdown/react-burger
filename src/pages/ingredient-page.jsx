import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppHeader from '../components/app-header/app-header';
import AppMain from '../components/app-main/app-main';
import ErrorMessage from '../components/error-message/error-message';
import IngredientSection from '../components/ingredient-section/ingredient-section';
import { changePageTitle } from '../utils/functions';

function IngredientPage() {

  useEffect(() => changePageTitle('Детали ингредиента'), []);

  const detailsRequestHasFailed = useSelector(state => state.ingredientDetails.detailsRequestHasFailed);

  return (
    <>
      <AppHeader />
      {!detailsRequestHasFailed
        ? (
          <AppMain>
            <IngredientSection />
          </AppMain>
        )
        : (<ErrorMessage>Не удалось установить связь с сервером</ErrorMessage>)
      }
    </>
  )
}

export default IngredientPage;