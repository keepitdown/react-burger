import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ element }) {

  const location = useLocation();

  const { authIsChecked, userIsLoggedIn } = useSelector(state => ({
    authIsChecked: state.auth.authIsChecked,
    userIsLoggedIn: state.auth.userIsLoggedIn
  }));

  return authIsChecked && (
    userIsLoggedIn
      ? element
      : <Navigate to='/login' state={{ originalPath: location.pathname }} replace />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default ProtectedRoute;