import React, { FC, useEffect } from 'react';
import { useDispatch } from '../../services/hooks';
import { getProfileData } from '../../services/actions/profile';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { Routes, Route, useLocation } from 'react-router-dom';
import ConstructorPage from '../../pages/constructor-page';
import FeedPage from '../../pages/feed-page';
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
import IngredientModal from '../../modals/ingredient-modal';
import { TLocationState } from '../../utils/types';

const App: FC = () => {

  const location = useLocation();
  const locationState: TLocationState = location.state;
  const background = locationState?.background;
  const ingredientNotFound = locationState?.ingredientNotFound;


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileData());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <AppMain>
        <Routes location={background || location}>
          <Route
            path="/"
            element={<ConstructorPage />}
          />
          <Route
            path="/ingredients/:id"
            element={!ingredientNotFound ? <IngredientPage /> : <NotFoundPage />}
          />
          <Route path="/feed" element={<FeedPage />} />
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
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={<IngredientModal />}
          />
        </Routes>
      )}
    </>
  )
};

export default App;
