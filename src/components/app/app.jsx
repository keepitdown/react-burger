import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ConstructorPage from '../../pages/constructor-page';
import LoginPage from '../../pages/login-page';
import RegistrationPage from '../../pages/registration-page';
import RecoveryPage from '../../pages/recovery-page';
import ResetPage from '../../pages/reset-page';
import ProfilePage from '../../pages/profile-page';

function App() {

  const requestHasFailed = useSelector(state => state.burgerIngredients.requestHasFailed);

  return (
    <Routes>
      <Route path="/" element={<ConstructorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-password" element={<RecoveryPage />} />
      <Route path="/reset-password" element={<ResetPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App;
