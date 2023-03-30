import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getProfileData } from '../../services/actions/auth';

function ProtectedRoute({ element }) {

  const location = useLocation();

  const dispatch = useDispatch();
  const { authIsChecked, userIsLoggedIn } = useSelector(state => ({
    authIsChecked: state.auth.authIsChecked,
    userIsLoggedIn: state.auth.userIsLoggedIn
  }));

  useEffect(() => {
    dispatch(getProfileData());
  }, []);

  return authIsChecked && (
    userIsLoggedIn
      ? element
      : <Navigate to='/login' state={{ originalPath: location.pathname }} replace />
  );
}

export default ProtectedRoute;