import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import ErrorMessage from '../error-message/error-message';

function App() {

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    <>
      <AppHeader />
      {!requestHasFailed
        ? (<AppMain />)
        : (<ErrorMessage>Не удалось установить связь с сервером</ErrorMessage>)
      }
    </>
  )
}

export default App;
