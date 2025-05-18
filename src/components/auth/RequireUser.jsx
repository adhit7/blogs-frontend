import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../Navbar';

const RequireUser = () => {
  const location = useLocation();

  const { user } = useUserContext();

  if (user) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }

  return <Navigate to='/login' state={{ from: location.pathname }} replace />;
};

export default RequireUser;
