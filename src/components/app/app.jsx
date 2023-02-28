import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import ErrorMessage from '../error-message/error-message';
import ConstructorPage from '../../pages/constructor-page';

function App() {

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    <Routes>
      <Route path="/" element={<ConstructorPage />} />
    </Routes>
  )
}

export default App;
