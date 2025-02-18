import React from 'react'
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const isloggedIn = useAuth();
  return isloggedIn ? children : <Navigate to='/'/>
}

export default PrivateRoute;