import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function UnauthorizedRoute({ element }) {

  const { authIsChecked, userIsLoggedIn } = useSelector(state => ({
    authIsChecked: state.auth.authIsChecked,
    userIsLoggedIn: state.auth.userIsLoggedIn
  }));

  const { state: locationState } = useLocation();

  return authIsChecked && (
    !userIsLoggedIn
      ? element
      : <Navigate to={locationState.originalPath || '/'} replace />
  );
}

UnauthorizedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default UnauthorizedRoute;