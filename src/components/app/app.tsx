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
import HistoryPage from '../../pages/history-page';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import IngredientModal from '../../modals/ingredient-modal';
import { TLocationState } from '../../utils/types';
import FeedModal from '../../modals/feed-modal';
import FeedOrderPage from '../../pages/feed-order-page';
import HistoryModal from '../../modals/history-modal';
import HistoryOrderPage from '../../pages/history-order-page';

const App: FC = () => {

  const location = useLocation();
  const locationState: TLocationState = location.state;
  const background = locationState?.background;
  const ingredientNotFound = locationState?.ingredientNotFound;
  const orderNotFound = locationState?.orderNotFound;

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
          <Route
            path="/feed"
            element={<FeedPage />}
          />
          <Route
            path="/feed/:id"
            element={!orderNotFound ? <FeedOrderPage /> : <NotFoundPage />}
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
          <Route
            path="/reset-password"
            element={<ResetPage />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/profile/orders"
            element={<ProtectedRoute element={<HistoryPage />} />}
          />
          <Route
            path="/profile/orders/:id"
            element={<ProtectedRoute element={!orderNotFound ? < HistoryOrderPage /> : <NotFoundPage />} />}
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
          <Route
            path="/feed/:id"
            element={<FeedModal />}
          />
          <Route
            path="/profile/orders/:id"
            element={<HistoryModal />}
          />
        </Routes>
      )}
    </>
  )
};

export default App;
