import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from './Components/userData';

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setChecking(false);
    }, 500);


    return () => clearTimeout(timer);
  }, []);

  if (checking) {
    return <div>Loading...</div>;
  }


  return user ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
