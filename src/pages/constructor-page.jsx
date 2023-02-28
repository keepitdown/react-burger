import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppHeader from '../components/app-header/app-header';
import AppMain from '../components/app-main/app-main';
import ErrorMessage from '../components/error-message/error-message';

function ConstructorPage() {

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

export default ConstructorPage;