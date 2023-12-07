/* eslint-disable */
import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../../context/authContext'

export const KitchenRoutes = () => {
  const { isLogged, data } = useAuth()

  if (isLogged() && data.user.userType == "kitchen") {
    return (
      <Outlet />
    )
  }
  return (
    <Navigate to="/login" />


  )
}


