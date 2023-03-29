import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ConstructorPage from '../../pages/constructor-page';
import LoginPage from '../../pages/login-page';
import RegistrationPage from '../../pages/registration-page';
import RecoveryPage from '../../pages/recovery-page';
import ResetPage from '../../pages/reset-page';
import ProfilePage from '../../pages/profile-page';
import IngredientPage from '../../pages/ingredient-page';
import NotFoundPage from '../../pages/not-found-page';

function App() {

  const { state: locationState } = useLocation();

  return (
    <Routes>
      <Route path="/" element={<ConstructorPage />} />
      <Route
        path="/ingredients/:id"
        element={!!locationState?.useModal ? <ConstructorPage /> : <IngredientPage />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-password" element={<RecoveryPage />} />
      <Route path="/reset-password" element={<ResetPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App;
