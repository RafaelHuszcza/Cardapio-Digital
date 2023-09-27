/* eslint-disable */
import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../../context/authContext'

export const GlobalRoutes = () => {
  const { isLogged, data } = useAuth()

  return (

    isLogged() ? data.user.usertype == "client" ? <Outlet/>: <Navigate to="/login" /> : <Navigate to="/login" />
      

  )
}


