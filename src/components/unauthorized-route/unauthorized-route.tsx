import React, { FC, ReactElement } from 'react';
import { useSelector } from '../../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { TLocationState } from '../../utils/types';

type TUnauthorizedRoute = {
  element: ReactElement;
};

const UnauthorizedRoute: FC<TUnauthorizedRoute> = ({ element }) => {

  const { authIsChecked, userIsLoggedIn } = useSelector(state => ({
    authIsChecked: state.auth.authIsChecked,
    userIsLoggedIn: state.auth.userIsLoggedIn
  }));

  const { state: locationState }: { state: TLocationState } = useLocation();

  if (!authIsChecked) {
    return null;
  }

  return (
    !userIsLoggedIn
      ? element
      : <Navigate to={locationState?.originalPath || '/'} replace />
  );
};

export default UnauthorizedRoute;