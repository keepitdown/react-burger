import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ConstructorPage from '../../pages/constructor-page';
import LoginPage from '../../pages/login-page';

function App() {

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    <Routes>
      <Route path="/" element={<ConstructorPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App;
