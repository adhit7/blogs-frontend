import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useUserContext } from '../../contexts/UserContext';

const RequireVisitor = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Outlet />;
  }

  return <Navigate to='/' replace />;
};

export default RequireVisitor;
