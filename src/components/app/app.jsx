import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfileData } from '../../services/actions/profile';
import { Routes, Route, useLocation } from 'react-router-dom';
import ConstructorPage from '../../pages/constructor-page';
import LoginPage from '../../pages/login-page';
import RegistrationPage from '../../pages/registration-page';
import RecoveryPage from '../../pages/recovery-page';
import ResetPage from '../../pages/reset-page';
import ProfilePage from '../../pages/profile-page';
import IngredientPage from '../../pages/ingredient-page';
import NotFoundPage from '../../pages/not-found-page';
import ProtectedRoute from '../protected-route/protected-route';
import UnauthorizedRoute from '../unauthorized-route/unauthorized-route';
import OrdersPage from '../../pages/orders-page';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';

function App() {

  const { state: locationState } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileData());
  }, []);

  return (
    <>
      <AppHeader />
      <AppMain>
        <Routes>
          <Route path="/" element={<ConstructorPage />} />
          <Route
            path="/ingredients/:id"
            element={!!locationState?.useModal
              ? <ConstructorPage />
              : !locationState?.ingredientNotFound ? <IngredientPage /> : <NotFoundPage />}
          />
          <Route
            path="/login"
            element={<UnauthorizedRoute element={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<UnauthorizedRoute element={<RegistrationPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<UnauthorizedRoute element={<RecoveryPage />} />}
          />
          <Route path="/reset-password" element={<ResetPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/profile/orders"
            element={<ProtectedRoute element={<OrdersPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppMain>
    </>
  )
}

export default App;
