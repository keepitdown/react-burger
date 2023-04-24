import React, { FC, ReactElement, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRoute = {
  element: ReactElement;
}

const ProtectedRoute: FC<TProtectedRoute> = ({ element }) => {

  const location = useLocation();

  const { authIsChecked, userIsLoggedIn } = useSelector<any, { authIsChecked: boolean, userIsLoggedIn: boolean }>(state => ({
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