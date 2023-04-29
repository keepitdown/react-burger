import React, { FC, ReactElement } from 'react';
import { useSelector } from '../../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRoute = {
  element: ReactElement;
}

const ProtectedRoute: FC<TProtectedRoute> = ({ element }) => {

  const location = useLocation();

  const { authIsChecked, userIsLoggedIn } = useSelector(state => ({
    authIsChecked: state.auth.authIsChecked,
    userIsLoggedIn: state.auth.userIsLoggedIn
  }));

  if (!authIsChecked) {
    return null;
  }

  return (
    userIsLoggedIn
      ? element
      : <Navigate to='/login' state={{ originalPath: location.pathname }} replace />
  );
};

export default ProtectedRoute;